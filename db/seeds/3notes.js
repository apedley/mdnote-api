exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          id: 1,
          title: 'test note',
          body: 'a note',
          categoryId: 1,
          userId: 1,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        }, {
          id: 2,
          title: 'test note 2',
          body: 'a note 2',
          categoryId: 1,
          userId: 1,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        }, {
          id: 3,
          title: 'test note 3',
          body: 'a note 3',
          categoryId: 2,
          userId: 2,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        }
      ]);
    });
};
