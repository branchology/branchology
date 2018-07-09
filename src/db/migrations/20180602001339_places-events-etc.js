exports.up = async db => {
  await Promise.all([
    db.schema.createTable('places', table => {
      table.uuid('id').primary();
      table.string('description').notNullable();
      table.string('street');
      table.string('street2');
      table.string('city', 60);
      table.string('state_province', 60);
      table.string('postal_code', 20);
      table.string('country', 60);
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('notes', table => {
      table.uuid('id').primary();
      table.text('text').notNullable();
      table.string('rin', 12);
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('sources', table => {
      table.uuid('id').primary();
      table.string('title').notNullable();
      table.string('author');
      table.string('publication');
      table.string('abbr', 60);
      table.text('text');
      table.string('rin', 12);
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),
  ]);

  await Promise.all([
    db.schema.createTable('events', table => {
      table.uuid('id').primary();
      table
        .uuid('place_id')
        .references('id')
        .inTable('places')
        .onUpdate('CASCADE')
        .onDelete('SET NULL');
      table.string('type', 4).notNullable();
      table.string('date', 35);
      table.string('date_stamp', 8);
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

    db.schema.createTable('source_citations', table => {
      table.uuid('id').primary();
      table
        .uuid('source_id')
        .notNullable()
        .references('id')
        .inTable('sources')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('page');
      table.text('citation');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),
  ]);

  return Promise.all([
    db.schema.createTable('event_notes', table => {
      table.uuid('id').primary();
      table
        .uuid('event_id')
        .references('id')
        .inTable('events')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .uuid('note_id')
        .references('id')
        .inTable('notes')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('event_source_citations', table => {
      table.uuid('id').primary();
      table
        .uuid('event_id')
        .references('id')
        .inTable('events')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table
        .uuid('source_citation_id')
        .references('id')
        .inTable('source_citations')
        .notNullable()
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
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
    db.schema.dropTable('event_notes'),
    db.schema.dropTable('event_source_citations'),
  ]);
  await Promise.all([
    db.schema.dropTable('events'),
    db.schema.dropTable('source_citations'),
  ]);
  return Promise.all([
    db.schema.dropTable('sources'),
    db.schema.dropTable('notes'),
    db.schema.dropTable('places'),
  ]);
};
