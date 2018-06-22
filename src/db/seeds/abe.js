const {
  addPersonEventSourceCitation,
  addPersonNameSourceCitation,
  addPersonSourceCitation,
  attachPersonEventNote,
  attachPersonNameNote,
  attachPersonNote,
  createNote,
  createPerson,
  createPlace,
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
    truncateCascade(db, 'event_sources'),
    truncateCascade(db, 'person_name_notes'),
    truncateCascade(db, 'person_name_sources'),
    truncateCascade(db, 'person_event_sources'),
    truncateCascade(db, 'person_notes'),
    truncateCascade(db, 'person_parents'),
    truncateCascade(db, 'person_relationships'),
    truncateCascade(db, 'person_sources'),
    truncateCascade(db, 'relationship_notes'),
    truncateCascade(db, 'relationship_sources'),
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

  const hodgenville = await createPlace({ description: 'Hodgenville, KY' });
  const dc = await createPlace({ description: 'Washington, DC' });

  const abe = await createPerson({
    given: 'Abraham',
    surname: 'Lincoln',
    sex: 'M',
    birthDate: '12 Feb 1809',
    birthPlaceId: hodgenville.id,
    deathDate: '15 Apr 1865',
    deathPlaceId: dc.id,
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

  await addPersonEventSourceCitation(
    events.find(e => e.type === 'birt').person_event_id,
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
  await attachPersonEventNote(
    events.find(e => e.type === 'deat').person_event_id,
    note3.id,
  );
};
