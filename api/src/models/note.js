import { Model } from 'objection';
import Category from './category';
import User from './user';
import Share from './share';

export default class Note extends Model {

  static get tableName() {
    return 'notes';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['title'],
      properties: {
        title: { type: 'string' },
        body: { type: 'text' },
        preview: { type: 'text' },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' },
        categoryId: { type: 'integer' }
      }
    }
  }

  static get relationMappings() {
    return {
      category: {
        relation: Model.BelongsToOneRelation,
        modelClass: Category,
        join: {
          from: 'notes.categoryId',
          to: 'categories.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'notes.userId',
          to: 'users.id'
        }
      },
      shares: {
        relation: Model.HasManyRelation,
        modelClass: Share,
        join: {
          from: 'notes.id',
          to: 'shares.noteId'
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

