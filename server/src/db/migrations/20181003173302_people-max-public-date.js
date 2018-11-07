exports.up = db => {
  return db.schema.table('people', table => {
    table.date('max_public_date');
  });
};

exports.down = db => {
  return db.schema.table('people', table => {
    table.dropColumn('max_public_date');
  });
};
