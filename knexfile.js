// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'mdnote-development',
      user: 'andrew',
      password: null
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    connection: {
      database: 'mdnote-test',
      user:     'andrew',
      password: null
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
