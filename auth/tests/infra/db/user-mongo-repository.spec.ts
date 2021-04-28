import { MongoHelper, UserMongoRepository } from '@/infra/db'
import { mockCreateUserParams } from '@/tests/domain/mocks'

import { Collection } from 'mongodb'

let usersCollection: Collection

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

describe('UserMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.deleteMany({})
  })

  test('should return true on success', async () => {
    const sut = makeSut()
    const createUserParams = mockCreateUserParams()
    const isValid = await sut.create(createUserParams)
    expect(isValid).toBe(true)
  })
})
