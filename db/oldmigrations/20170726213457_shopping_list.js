
exports.up = function(knex, Promise) {
  return knex.schema.createTable('shopping_lists', function(table){
    table.increments('id').primary();
    table.string('name').notNullable();
    table.text('notes');
    table.timestamps();
  }).then(function() {
    return knex.schema.createTable('shopping_list_items', function(table){
      table.increments('id').primary();
      table.boolean('completed');
      table.integer('shoppingListId').references('id').inTable('shopping_lists').onDelete('CASCADE');
      table.integer('ingredientId').references('id').inTable('ingredients').onDelete('CASCADE');
      table.timestamps();
    });
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('shopping_list_items')
    .then(function() {
      return knex.schema.dropTable('shopping_lists')
    });
};
