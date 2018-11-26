exports.up = function(db) {
  return db.schema.alterTable('person_attributes', table => {
    table
      .uuid('place_id')
      .references('id')
      .inTable('places')
      .onUpdate('CASCADE')
      .onDelete('SET NULL');
    table.string('type', 4);
    table.string('date', 35);
    table.string('date_stamp', 8);
    table
      .boolean('is_preferred')
      .defaultTo(true)
      .notNullable();
  });
};

exports.down = function(db) {
  return db.schema.alterTable('person_attributes', table => {
    table.dropColumns('place_id', 'type', 'date', 'date_stamp', 'is_preferred');
  });
};
