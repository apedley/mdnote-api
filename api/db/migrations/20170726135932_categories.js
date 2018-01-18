
exports.up = function(knex, Promise) {
  return knex.schema.createTable('categories', function(table){
    table.increments();
    table.string('name').notNullable();
    table.text('description');
    table.integer('userId').references('id').inTable('users').onDelete('CASCADE');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('categories');
};
