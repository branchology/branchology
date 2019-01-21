exports.up = function(db) {
  return db.schema.createTable('source_notes', table => {
    table.uuid('id').primary();
    table
      .uuid('source_id')
      .references('id')
      .inTable('sources')
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
  });
};

exports.down = function(db) {
  return db.dropTable('source_notes');
};
