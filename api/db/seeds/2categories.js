exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('categories')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('categories').insert([
        {
          id: 1,
          name: 'test cat',
          description: 'a cat',
          userId: 1,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        }, {
          id: 2,
          name: 'test cat 2',
          description: 'a cat 2',
          userId: 1,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        }, {
          id: 3,
          name: 'test cat 3',
          description: 'a cat 3',
          userId: 2,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        }
      ]);
    });
};
