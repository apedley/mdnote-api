
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shares', function(table){
    table.increments();
    table.string('url').notNullable();
    table.string('title');
    table.text('body');
    table.integer('views').defaultTo(1);
    table.integer('noteId');
    table.integer('userId');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shares');
};
