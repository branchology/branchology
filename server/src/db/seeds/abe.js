const {
  addEventSourceCitation,
  addPersonNameSourceCitation,
  addPersonSourceCitation,
  attachEventNote,
  attachPersonNameNote,
  attachPersonNote,
  createNote,
  createPerson,
  createPlace,
  createRelationship,
  createSource,
  findPersonEventsByPersonIds,
  findPersonNamesByPersonIds,
} = require('../');

function truncateCascade(db, table) {
  return db.raw(`TRUNCATE ${table} CASCADE`);
}

exports.seed = async db => {
  // TRUNCATE
  await Promise.all([
    truncateCascade(db, 'event_notes'),
    truncateCascade(db, 'event_source_citations'),
    truncateCascade(db, 'person_name_notes'),
    truncateCascade(db, 'person_name_source_citations'),
    truncateCascade(db, 'person_notes'),
    truncateCascade(db, 'person_parents'),
    truncateCascade(db, 'person_relationships'),
    truncateCascade(db, 'person_source_citations'),
    truncateCascade(db, 'relationship_notes'),
    truncateCascade(db, 'relationship_source_citations'),
    truncateCascade(db, 'source_citations'),
  ]);

  await Promise.all([
    truncateCascade(db, 'events'),
    truncateCascade(db, 'notes'),
    truncateCascade(db, 'person_names'),
    truncateCascade(db, 'relationships'),
    truncateCascade(db, 'sources'),
  ]);

  await Promise.all([
    truncateCascade(db, 'people'),
    truncateCascade(db, 'places'),
  ]);

  const [hodgenville, lexington, dc, springfield] = await Promise.all([
    createPlace({ description: 'Hodgenville, KY' }),
    createPlace({ description: 'Lexington, KY' }),
    createPlace({ description: 'Washington, DC' }),
    createPlace({ description: 'Springfield, IL' }),
  ]);

  const abe = await createPerson({
    given: 'Abraham',
    surname: 'Lincoln',
    sex: 'M',
    birthDate: '12 Feb 1809',
    birthPlaceId: hodgenville.id,
    deathDate: '15 Apr 1865',
    deathPlaceId: dc.id,
  });

  const mary = await createPerson({
    given: 'Mary Ann',
    surname: 'Todd',
    sex: 'F',
    birthDate: '13 Dec 1818',
    birthPlaceId: lexington.id,
    deathDate: '16 Jul 1882',
    deathPlaceId: springfield.id,
  });

  const presidentialLibrary = await createSource({
    title: 'Abraham Lincoln Presidential Library',
  });

  const ilBirthCertificates = await createSource({
    title: 'Illinois Birth Certificates',
  });

  await addPersonSourceCitation(abe.id, presidentialLibrary.id, {
    citation: 'This guy was a president',
  });

  const names = await findPersonNamesByPersonIds([abe.id]);

  await addPersonNameSourceCitation(names[0].id, ilBirthCertificates.id, {
    citation: 'Name: Abraham Lincoln\n\nBirth: 12 Feb 1809 in Hodgenville, IL',
  });

  const events = await findPersonEventsByPersonIds([abe.id]);

  await addEventSourceCitation(
    events.find(e => e.type === 'birt').id,
    ilBirthCertificates.id,
    {
      citation:
        'Name: Abraham Lincoln\n\nBirth: 12 Feb 1809 in Hodgenville, IL',
    },
  );

  const note1 = await createNote({ text: 'Freed the slaves' });
  const note2 = await createNote({ text: 'Sometimes called "Honest Abe"' });
  const note3 = await createNote({
    text: "Was assassinated by John Wilkes Booth at Ford's Theatre",
  });

  await attachPersonNote(abe.id, note1.id);
  await attachPersonNameNote(names[0].id, note2.id);
  await attachEventNote(events.find(e => e.type === 'deat').id, note3.id);

  // relationship
  const relationship = await createRelationship(abe.id, mary.id, {
    marriageDate: '4 Nov 1842',
    marriagePlaceId: springfield.id,
  });
};
