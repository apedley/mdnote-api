
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('firstName');
    table.string('lastName');
    table.text('tokens').notNullable().defaultTo('[]');
    table.enum('role', ['Admin', 'User']).defaultTo('User');
    table.string('resetPasswordToken');
    table.date('resetPasswordExpires');
    table.timestamps();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
