import Category from '../src/models/category';
import User from '../src/models/user';

export function setupUsers() {
  const users = [
    {id: 1, email: 'test@test.com', password: 'test1234'}
  ];

  return User.query().insert(users);
}

export function createUser(data) {
  return User.query().insert(data);
}

export function setupCategories() {
  const categories = [
    {id: 1, name: 'things', description: 'a thing'},
    {id: 2, name: 'more', description: 'nope no'},
    {id: 3, name: 'another', description: 'no ok'},
  ];

  return Category.query().insert(categories);
}

export function resetCategories() {
  return Category.query().delete();
}

export function resetUsers() {
  return User.query().delete();
}
