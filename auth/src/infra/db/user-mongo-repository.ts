import { MongoHelper } from '@/infra/db/mongo-helper'
import { CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/db'
import { CreateUserParams } from '@/domain/usecases'
import { UserModel } from '@/domain/models'

export class UserMongoRepository implements CreateUserRepository, LoadUserByEmailRepository {
  async create (createUserParams: CreateUserParams): Promise<boolean> {
    const usersCollection = await MongoHelper.getCollection('users')
    const result = await usersCollection.insertOne(createUserParams)
    return result.ops[0] !== null
  }

  async loadByEmail (email: string): Promise<UserModel> {
    const usersCollection = await MongoHelper.getCollection('users')
    const user = await usersCollection.findOne({
      email
    }, {
      projection: {
        name: 1,
        password: 1
      }
    })
    return user && MongoHelper.map(user)
  }
}
