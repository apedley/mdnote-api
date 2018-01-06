import { Model } from 'objection';
import Note from './note';
import User from './user';

export default class Share extends Model {

  static get tableName() {
    return 'shares';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        url: { type: 'string' },
        body: { type: 'text' },
        title: { type: 'string' },
        views: { type: 'integer' },
        noteId: { type: 'integer' },
        userId: { type: 'integer' },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' }
      }
    }
  }

  static get relationMappings() {
    return {
      note: {
        relation: Model.BelongsToOneRelation,
        modelClass: Note,
        join: {
          from: 'shares.noteId',
          to: 'notes.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'shares.userId',
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
