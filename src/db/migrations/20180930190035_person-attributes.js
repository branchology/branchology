exports.up = db => {
  return db.schema.createTable('person_attributes', table => {
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
    table.string('data');
    table
      .dateTime('created')
      .notNullable()
      .defaultTo(db.raw('CURRENT_TIMESTAMP'))
      .notNullable();
  });
};

exports.down = db => {
  return db.dropTable('person_attributes');
};
