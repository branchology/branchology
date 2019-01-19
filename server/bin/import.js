require('babel-register');
const parseGedcom = require('parse-gedcom');
const fs = require('fs');
const { createNote } = require('../src/db');
const conn = require('../src/db/conn').default;
const { createDbal } = require('../src/db/createDbal');
const generateUuid = require('../src/lib/generateUuid').default;

const sources = { notes: [] };
const noteMap = {};
const peopleMap = {};
const sourceMap = {};

const dbal = createDbal(conn);

fs.readFile(process.argv[2], (err, data) => {
  if (err) throw err;
  const gedcom = parseGedcom.parse(data.toString());

  runImport(gedcom)
    .then(() => {
      conn.destroy(() => null);
    })
    .catch(e => {
      console.error(e);
      conn.destroy(() => null);
    });
});

async function runImport(gedcomJson) {
  await importNotes(gedcomJson);
  await importSources(gedcomJson);
  await importPeople(gedcomJson);
  await importFamilies(gedcomJson);
}

function importNotes(gedcomJson) {
  return Promise.all(
    gedcomJson.map(async node => {
      if (node.tag === 'NOTE') {
        const note = await importNote(node);
        noteMap[node.pointer] = note.id;
        return note;
      }
    }),
  );
}

function importSources(gedcomJson) {
  return Promise.all(
    gedcomJson.map(async node => {
      if (node.tag === 'SOUR') {
        const source = await importSource(node);
        sourceMap[node.pointer] = source.id;
        return source;
      }
    }),
  );
}

function importPeople(gedcomJson) {
  return Promise.all(
    gedcomJson.map(async node => {
      if (node.tag === 'INDI') {
        const person = await importPerson(node);
        peopleMap[node.pointer] = person.id;
        return person;
      }
    }),
  );
}

function importFamilies(gedcomJson) {
  return Promise.all(
    gedcomJson.map(async node => {
      if (node.tag === 'FAM') {
        return importRelationship(node);
      }
    }),
  );
}

function importNote(node) {
  const data = { referenceId: node.pointer, text: node.data };

  node.tree.forEach(attr => {
    switch (attr.tag) {
      case 'CONC':
        data.text = data.text + attr.data;
        break;
      case 'CONT':
        data.text = data.text + '\n' + attr.data;
        break;
      default:
        console.warn(
          `Unhandled tag note.[${attr.tag}]: ${JSON.stringify(attr)}`,
        );
    }
  });

  return createNote(data);
}

function importSource(node) {
  const data = { referenceId: node.pointer };
  node.tree.forEach(attr => {
    switch (attr.tag) {
      case 'AUTH':
        data.author = attr.data;
        break;
      case 'TITL':
        data.title = attr.data;
        break;
      case 'NOTE':
        // TODO: FIXME: Implement saving
        sources.notes.push({ note: attr.data });
        break;
      case 'PUBL':
        data.publication = attr.data;
        break;
      case 'REPO':
        // TODO: FIXME: Implement
        break;
      default:
        console.warn(
          `Unhandled tag source.[${attr.tag}]: ${JSON.stringify(attr)}`,
        );
    }
  });

  return dbal.source.createSource(data);
}

async function importPerson(node) {
  const id = generateUuid();

  const data = { referenceId: node.pointer };

  const names = [];
  const attributes = [];
  const events = [];
  const notes = [];

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'SEX':
        data.sex = attr.data;
        break;
      case 'CHAN':
        data.lastUpdated = attr.data;
        break;
      case 'EDUC':
      case 'FACT':
      case 'OCCU':
      case 'PROP':
      case 'RESI':
        attributes.push(buildAttributeRecord(attr));
        break;
      case 'BAPM':
      case 'BIRT':
      case 'BURI':
      case 'CENS':
      case 'CHR':
      case 'CONF':
      case 'DEAT':
      case 'EVEN':
      case 'EMIG':
      case 'IMMI':
      case 'NATU':
        events.push(buildEventRecord(attr));
        break;
      case 'ADDR':
        // TODO: FIXME: wtf is this?
        break;
      case 'NAME':
        names.push(buildNameRecord(attr));
        break;
      case 'FAMC':
        // TODO: FIXME: Implement? Or just rely on FAM records?
        break;
      case 'FAMS':
        // TODO: FIXME: Implement? Or just rely on FAM records?
        break;
      case 'NOTE':
        notes.push(noteMap[attr.data]);
        // TODO: FIXME: Implement inline notes?
        break;
      default:
        // TODO: FIXME:
        console.warn(
          `Unhandled tag indi.[${attr.tag}]: ${JSON.stringify(attr)}`,
        );
    }
  });

  const person = await dbal.person.create({ id, ...data });

  await Promise.all(names.map(name => dbal.person.createName(id, name)));
  await Promise.all(
    attributes.map(async ({ ...attributeDetails }) => {
      return await dbal.person.createAttribute(id, attributeDetails);
    }),
  );
  await Promise.all(
    events.map(async ({ type, ...eventDetails }) => {
      const event = await dbal.event.createEvent(type, eventDetails);
      return dbal.person.attachEvent(id, event.id);
    }),
  );
  await Promise.all(notes.map(note => dbal.person.attachNote(person.id, note)));

  return person;
}

function runIntegrations(rootNode, object, attr, fullTree) {
  // Family Tree Maker 2005
  switch (attr.tag.toUpperCase()) {
    case '_MEND':
      // Handle this in _F1
      return true;
    case '_FA1':
      // Find _MEND
      const mend = fullTree.tree.filter(n => n.tag === '_MEND');
      if (mend.length == 1) {
        const divorce = buildEventRecord({ tag: 'DIV', ...attr, tag: 'DIV' });
        object.events.push(divorce);

        return true;
      }

      return false;
    default:
      return false;
  }
}

async function importRelationship(node) {
  const data = { referenceId: node.pointer };

  const spouses = [];
  const events = [];
  const children = [];
  const notes = [];

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'HUSB':
      case 'WIFE':
        spouses.push(peopleMap[attr.data]);
        break;
      case 'CHIL':
        children.push({ id: peopleMap[attr.data] });
        // TODO: FIXME: Do something here?
        if (attr.tree.length) {
          // TODO: FIXME: Implement
          console.warn(`Unhandled tag CHIL.*: ${JSON.stringify(attr.tree)}`);
        }
        break;
      case 'NOTE':
        notes.push(noteMap[attr.data]);
        // TODO: FIXME: Implement inline notes?
        break;
      case 'ANUL':
      case 'DIV':
      case 'MARR':
        events.push(buildEventRecord(attr));
        break;
      default:
        const result = runIntegrations('fam', { ...data, events }, attr, node);

        if (!result) {
          // TODO: FIXME: Implement
          console.warn(
            `Unhandled tag fam.[${attr.tag}]: ${JSON.stringify(attr)}`,
          );
        }
    }
  });

  const relationship = await dbal.relationship.create(
    spouses[0],
    spouses.length > 1 ? spouses[1] : undefined,
    data,
  );

  await Promise.all(
    events.map(async ({ type, ...details }) => {
      const event = await dbal.event.createEvent(type, details);
      return dbal.relationship.attachEvent(relationship.id, event.id);
    }),
  );

  // TODO: FIXME: Handle children
  await Promise.all(
    children.map(({ id }) => {
      return dbal.relationship.attachChild(relationship.id, id);
    }),
  );

  return relationship;
}

function buildNameRecord(node) {
  const name = { sources: [] };
  const pieces = node.data.split(/(.*)\/(.*)\//);

  name.given = pieces[1].trim();
  name.surname = pieces[2].trim();

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'SOUR':
        name.sources.push(buildSourceCitationRecord(attr));
        break;
      default:
        console.warn(
          `Unhandled tag name.[${attr.tag}]: ${JSON.stringify(attr)}`,
        );
    }
  });

  return name;
}

function buildAttributeRecord(node) {
  const attribute = {
    data: node.data,
    event: {
      type: node.tag,
      sources: [],
      notes: [],
    },
  };

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'DATE':
        attribute.event.date = attr.data.trim();
        break;
      case 'PLAC':
        attribute.event.place = attr.data.trim();
        break;
      case 'SOUR':
        attribute.event.sources.push(buildSourceCitationRecord(attr));
        break;
      default:
        console.warn(
          `Unhandled tag attr.[${attr.tag}]: ${JSON.stringify(attr)}`,
        );
    }
  });

  return attribute;
}

function buildEventRecord(node) {
  const event = { type: node.tag, sources: [], notes: [] };

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'DATE':
        event.date = attr.data.trim();
        break;
      case 'PLAC':
        event.place = attr.data.trim();
        break;
      case 'SOUR':
        const sour = buildSourceCitationRecord(attr);
        event.sources.push(sour);
        break;
      default:
        console.warn(
          `Unhandled tag event.[${attr.tag}]: ${JSON.stringify(attr)}`,
        );
    }
  });

  return event;
}

// function buildNoteRecord(node) {
//   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
//   console.log(JSON.stringify(node, null, 2));
//   console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
//   // const event = { type: node.tag, sources: [], notes: [] };

//   // node.tree.forEach(attr => {
//   //   switch (attr.tag.toUpperCase()) {
//   //     case 'DATE':
//   //       event.date = attr.data.trim();
//   //       break;
//   //     case 'PLAC':
//   //       event.place = attr.data.trim();
//   //       break;
//   //     case 'SOUR':
//   //       event.sources.push(buildSourceCitationRecord(attr));
//   //       break;
//   //     default:
//   //       console.warn(
//   //         `Unhandled tag event.[${attr.tag}]: ${JSON.stringify(attr)}`,
//   //       );
//   //   }
//   // });

//   // return event;
// }

function buildTextRecord(node) {
  let text = node.data;

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'CONT':
        text = text + '\n' + attr.data;
        break;
      case 'CONC':
        text = text + attr.data;
        break;
      default:
        console.warn(
          `Unhandled tag text.[${attr.tag}]: ${JSON.stringify(attr, null, 2)}`,
        );
    }
  });

  return text;
}

function parseDataTree(node) {
  const data = {};

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'TEXT':
        data.text = buildTextRecord(attr);
        break;
      default:
        console.warn(
          `Unhandled tag data.[${attr.tag}]: ${JSON.stringify(attr, null, 2)}`,
        );
    }
  });

  return data;
}

function buildSourceCitationRecord(node) {
  if (!(node.data in sourceMap)) {
    console.error(`Failed to find souce: ${node.data}`);
    process.exit();
  }
  const citation = { sourceId: sourceMap[node.data] };

  node.tree.forEach(attr => {
    switch (attr.tag.toUpperCase()) {
      case 'DATA':
        const data = parseDataTree(attr);
        if (data.text) {
          citation.citation = data.text;
        }
        break;
      case 'PAGE':
        citation.page = attr.data;
        break;

      default:
        console.warn(
          `Unhandled tag sour[citation].[${attr.tag}]: ${JSON.stringify(
            attr,
            null,
            2,
          )}`,
        );
    }
  });

  return citation;
}
