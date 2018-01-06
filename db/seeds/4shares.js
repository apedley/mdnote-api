exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('notes')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {
          url: 'abcd',
          body: 'ooai sdjfoia soidf',
          title: 'title title title',
          views: 0,
          noteId: 1,
          userId: 1,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        },
        {
          url: 'abce',
          body: 'ooai sdjfoia soidf',
          title: 'title title title',
          views: 0,
          noteId: 1,
          userId: 1,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        },
        {
          url: 'abcf',
          body: 'ooai sdjfoia soidf',
          title: 'title title title',
          views: 0,
          noteId: 2,
          userId: 2,
          "created_at": "2017-12-06T18:33:37.501Z",
          "updated_at": "2017-12-06T18:33:37.501Z"
        }
      ]);
    });
};
