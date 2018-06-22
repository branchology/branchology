exports.up = async db => {
  await db.schema.createTable('people', table => {
    table.uuid('id').primary();
    table.string('sex', 1);
    table.string('slug', 100);
    table
      .dateTime('created')
      .notNullable()
      .defaultTo(db.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });

  await Promise.all([
    db.schema.createTable('person_names', table => {
      table.uuid('id').primary();
      table
        .uuid('person_id')
        .references('id')
        .inTable('people')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.string('personal', 120);
      table.string('prefix', 30);
      table.string('given', 120);
      table.string('surname_prefix', 30);
      table.string('surname', 120);
      table.string('suffix', 30);
      table.string('nickname', 30);
      table
        .boolean('is_preferred')
        .defaultTo(true)
        .notNullable();
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('person_events', table => {
      table.uuid('id').primary();
      table
        .uuid('person_id')
        .references('id')
        .inTable('people')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('event_id')
        .references('id')
        .inTable('events')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('person_sources', table => {
      table.uuid('id').primary();
      table
        .uuid('person_id')
        .references('id')
        .inTable('people')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('source_id')
        .references('id')
        .inTable('sources')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.text('citation');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('person_notes', table => {
      table.uuid('id').primary();
      table
        .uuid('person_id')
        .references('id')
        .inTable('people')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('note_id')
        .references('id')
        .inTable('notes')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),
  ]);

  return Promise.all([
    db.schema.createTable('person_name_notes', table => {
      table.uuid('id').primary();
      table
        .uuid('person_name_id')
        .references('id')
        .inTable('person_names')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('note_id')
        .references('id')
        .inTable('notes')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('person_name_sources', table => {
      table.uuid('id').primary();
      table
        .uuid('person_name_id')
        .references('id')
        .inTable('person_names')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('source_id')
        .references('id')
        .inTable('sources')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.text('citation');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('person_event_sources', table => {
      table.uuid('id').primary();
      table
        .uuid('person_event_id')
        .references('id')
        .inTable('person_events')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('source_id')
        .references('id')
        .inTable('sources')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.text('citation');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),
  ]);
};

exports.down = async db => {
  await Promise.all([
    db.schema.dropTable('person_event_sources'),
    db.schema.dropTable('person_name_sources'),
    db.schema.dropTable('person_name_notes'),
  ]);

  await Promise.all([
    db.schema.dropTable('person_notes'),
    db.schema.dropTable('person_sources'),
    db.schema.dropTable('person_events'),
    db.schema.dropTable('person_names'),
  ]);

  return Promise.all([db.schema.dropTable('people')]);
};
