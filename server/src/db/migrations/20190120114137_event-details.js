exports.up = function(db) {
  return db.schema.table('events', table => {
    table.string('custom_type', 90);
    table.string('cause', 90);
    table.string('age', 12);
  });
};

exports.down = function(db) {
  return db.schema.table('events', table => {
    table.dropColumns('custom_type', 'cause', 'age');
  });
};
