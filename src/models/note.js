import { Model } from 'objection';
import Category from './category';
import User from './user';

export default class Note extends Model {

  static get tableName() {
    return 'notes';
  }

  getSummary() {
    const summaryLength = 100;
    let summary = this.body.trim();

    if (summary.length > summaryLength) {
      summary = summary.slice(0, summaryLength-3) + '...';
    }

    return summary;
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
      }
    }
  }
  $beforeInsert() {
    this.getSummary();
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
  };

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  };


}

