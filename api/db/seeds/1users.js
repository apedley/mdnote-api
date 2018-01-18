exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          id: 1,
          email: 'abc123@gmail.com',
          password: '$2a$12$0ALMSAadjNZ4XCogEs7x8OxMrFp2lLKl5j0E6f1Bq5OIr4rY4vKva',
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z",
          "tokens": "[]"
        }, {
          id: 2,
          email: 'abc234@gmail.com',
          password: '$2a$12$bwRTsMaOjUjlEWI2wUYGhejohWWRJjoqD1wy6092rgV.jTI8yj14i',
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z",
          "tokens": "[]"
        }, {
          id: 3,
          email: 'abc345@gmail.com',
          password: '$2a$12$bwRTsMaOjUjlEWI2wUYGhejohWWRJjoqD1wy6092rgV.jTI8yj14i',
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z",
          "tokens": '[]'
        }
      ]);
    });
};
