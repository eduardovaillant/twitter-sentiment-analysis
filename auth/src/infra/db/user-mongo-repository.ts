import { MongoHelper } from '@/infra/db/mongo-helper'
import { CreateUserRepository } from '@/data/protocols/db'
import { CreateUserParams } from '@/domain/usecases'

export class UserMongoRepository implements CreateUserRepository {
  async create (createUserParams: CreateUserParams): Promise<boolean> {
    const usersCollection = await MongoHelper.getCollection('users')
    const result = await usersCollection.insertOne(createUserParams)
    return result.ops[0] !== null
  }
}
