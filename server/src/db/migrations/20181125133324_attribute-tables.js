exports.up = function(db) {
  return Promise.all([
    db.schema.createTable('person_attribute_notes', table => {
      table.uuid('id').primary();
      table
        .uuid('person_attribute_id')
        .references('id')
        .inTable('person_attributes')
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

    db.schema.createTable('person_attribute_source_citations', table => {
      table.uuid('id').primary();
      table
        .uuid('person_attribute_id')
        .references('id')
        .inTable('person_attributes')
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

exports.down = function(db) {};
