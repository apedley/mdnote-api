const Password = require('objection-password')({
  allowEmptyPassword: true
});
const Model = require('objection').Model;
const Unique = require('objection-unique')({
  fields: ['email'],
  identifiers: ['id']
});

import Category from './category';
import Note from './note';


export default class User extends Password(Unique(Model)) {

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email'],
      properties: {
        id: { type: 'integer' },
        email: { type: 'string' },
        password: { type: 'string' },
        fistName: { type: 'string' },
        lastName: { type: 'string' },
        role: {
          type: 'string',
          enum: ['Admin', 'User'],
          default: 'User'
        },
        tokens: {
          type: 'array',
          items: { type: 'string' }
        },
        resetPasswordToken: { type: 'string' },
        resetPasswordExpires: { type: 'date' },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' },
        google: {
          id: { type: 'string' },
          token: { type: 'string' },
          photo: { type: 'string' },
          displayName: { type: 'string' }
        },
        facebook: {
          id: { type: 'string' },
          token: { type: 'string' },
          displayName: { type: 'string' },
          email: { type: 'string' },
          photo: { type: 'string' }
        },
        twitter: {
          id: { type: 'string' },
          token: { type: 'string' },
          displayName: { type: 'string' },
          handle: { type: 'string' },
          photo: { type: 'string' },
          metadata: {
            location: { type: 'string' },
            description: { type: 'string' }
          }
        }
      }
    }
  }

  static get relationMappings() {
    return {
      categories: {
        relation: Model.HasManyRelation,
        modelClass: Category,
        join: {
          from: 'users.id',
          to: 'categories.userId'
        }
      },
      notes: {
        relation: Model.HasManyRelation,
        modelClass: Note,
        join: {
          from: 'users.id',
          to: 'notes.userId'
        }
      }
    }
  }

  async $beforeInsert() {
    const creationDate = new Date().toISOString();
    this.created_at = creationDate;
    this.updated_at = creationDate;
    const hash = await this.generateHash();
  }

  async $beforeUpdate() {
    this.updated_at = new Date().toISOString();
    const hash = await this.generateHash();
  }
}
