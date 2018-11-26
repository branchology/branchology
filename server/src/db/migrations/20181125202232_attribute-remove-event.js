exports.up = function(db) {
  return db.schema.alterTable('person_attributes', table => {
    table.dropColumn('event_id');
  });
};

exports.down = function(db) {
  return db.schema.alterTable('person_attributes', table => {
    // this isn't going to work if there's data in the table already...
    table
      .uuid('event_id')
      .references('id')
      .inTable('events')
      .notNullable()
      .onUpdate('CASCADE');
  });
};
