const Password = require('objection-password')();
const Model = require('objection').Model;


import Category from './category';
import Note from './note';


export default class User extends Password(Model) {

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
        resetPasswordToken: { type: 'string' },
        resetPasswordExpires: { type: 'date' },
        created_at: { type: 'timestamp' },
        updated_at: { type: 'timestamp' }
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
    this.created_at = new Date().toISOString();
    this.updated_at = new Date().toISOString();
    const hash = await this.generateHash();
  }

  async $beforeUpdate() {
    this.updated_at = new Date().toISOString();
    const hash = await this.generateHash();
  }


}
