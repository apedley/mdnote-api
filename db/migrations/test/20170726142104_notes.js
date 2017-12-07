
exports.up = function(knex, Promise) {
  return knex.schema.createTable('notes', function(table){
    table.increments();
    table.string('title').notNullable();
    table.text('body');
    table.text('preview');
    table.integer('categoryId').references('id').inTable('categories');
    table.integer('userId').references('id').inTable('users');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('notes');
};
