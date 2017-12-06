
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes_ingredients', function(table){
    table.integer('recipeId').notNullable();
    table.integer('ingredientId').notNullable();
    table.integer('amount');
  });  
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes_ingredients');
};
