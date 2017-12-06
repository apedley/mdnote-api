
exports.up = function(knex, Promise) {
  return knex.schema.table('recipes', function(t) {
    t.boolean('public').notNull().defaultTo(true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('recipes', function(t) {
    t.dropColumn('public');
  });
};
