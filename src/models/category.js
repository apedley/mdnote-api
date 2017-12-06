import { Model } from 'objection';
import Note from './note';
import User from './user';

export default class Category extends Model {

  static get tableName() {
    return 'categories';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],
      properties: {
        id: { type: 'integer' },
        description: { type: 'text' },
        name: { type: 'string' },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' }
      }
    }
  }

  static get relationMappings() {
    return {
      notes: {
        relation: Model.HasManyRelation,
        modelClass: Note,
        join: {
          from: 'categories.id',
          to: 'notes.categoryId'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'categories.userId',
          to: 'users.id'
        }
      }
    }
  }


  $beforeInsert() {
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  };
  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  };

}
