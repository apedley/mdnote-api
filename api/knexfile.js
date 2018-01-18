// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    // connection: {
    //   database: 'mdnote-development',
    //   user: 'mdnote-user',
    //   password: 'mdnote-mdnote'
    // },
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: __dirname + '/db/migrations'
    },
    seeds: {
      directory: __dirname + '/db/seeds'
    }
  },

  test: {
    client: 'postgresql',
    // connection: {
    //   database: 'mdnote-test',
    //   user:     'mdnote-user',
    //   password: 'mdnote-mdnote'
    // },
    connection: process.env.DATABASE_URL_TEST,
    pool: {
      min: 2,
      max: 20
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
    // connection: {
    //   database: 'mdnote-prod',
    //   user:     'mdnote-user',
    //   password: 'mdnote-mdnote'
    // },
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 20
    },
    migrations: {
      directory: __dirname + '/db/migrations'
    }
  }

};
