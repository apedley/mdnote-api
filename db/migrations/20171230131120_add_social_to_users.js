
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.text('google');
    table.text('twitter');
    table.text('facebook');
    table.text('github');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('users', function(table) {
    table.dropColumn('google');
    table.dropColumn('twitter');
    table.dropColumn('facebook');
    table.dropColumn('github');
  })
};
