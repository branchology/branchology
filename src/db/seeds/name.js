const { createPerson, createPlace } = require('../');

function truncateCascade(db, table) {
  return db.raw(`TRUNCATE ${table} CASCADE`);
}

exports.seed = async db => {
  await Promise.all([
    truncateCascade(db, 'event_notes'),
    truncateCascade(db, 'event_sources'),
    truncateCascade(db, 'person_name_notes'),
    truncateCascade(db, 'person_name_sources'),
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
  });
};
