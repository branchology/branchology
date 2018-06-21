exports.up = async db => {
  await db.schema.createTable('relationships', table => {
    table.uuid('id').primary();
    table.string('rin', 12);
    table
      .dateTime('created')
      .notNullable()
      .defaultTo(db.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });

  return Promise.all([
    db.schema.createTable('person_relationships', table => {
      table.uuid('id').primary();
      table
        .uuid('person_id')
        .references('id')
        .inTable('people')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('relationship_id')
        .references('id')
        .inTable('relationships')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
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

    db.schema.createTable('relationship_events', table => {
      table.uuid('id').primary();
      table
        .uuid('relationship_id')
        .references('id')
        .inTable('relationships')
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

    db.schema.createTable('relationship_sources', table => {
      table.uuid('id').primary();
      table
        .uuid('relationship_id')
        .references('id')
        .inTable('relationships')
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
      table
        .dateTime('created')
        .notNullable()
        .defaultTo(db.raw('CURRENT_TIMESTAMP'))
        .notNullable();
    }),

    db.schema.createTable('relationship_notes', table => {
      table.uuid('id').primary();
      table
        .uuid('relationship_id')
        .references('id')
        .inTable('relationships')
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

    db.schema.createTable('person_parents', table => {
      table.uuid('id').primary();
      table
        .uuid('person_id')
        .references('id')
        .inTable('people')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('relationship_id')
        .references('id')
        .inTable('relationships')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .uuid('child_id')
        .references('id')
        .inTable('people')
        .notNullable()
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table
        .string('type', 20)
        .defaultTo(true)
        .notNullable();
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
  ]);
};

exports.down = async db => {
  await Promise.all([
    db.schema.dropTable('person_parents'),
    db.schema.dropTable('relationship_notes'),
    db.schema.dropTable('relationship_sources'),
    db.schema.dropTable('relationship_events'),
    db.schema.dropTable('person_relationships'),
  ]);

  return Promise.all([db.schema.dropTable('relationships')]);
};
