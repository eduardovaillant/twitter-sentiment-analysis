import { MongoHelper, UserMongoRepository } from '@/infra/db'
import { mockCreateUserParams } from '@/tests/domain/mocks'

import faker from 'faker'
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

  describe('create()', () => {
    test('should return true on success', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      const isValid = await sut.create(createUserParams)
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    test('should return an user on success', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      await usersCollection.insertOne(createUserParams)
      const user = await sut.loadByEmail(createUserParams.email)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(createUserParams.name)
      expect(user.password).toBe(createUserParams.password)
    })

    test('should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByEmail(faker.internet.email())
      expect(user).toBeFalsy()
    })
  })

  describe('checkByEmail()', () => {
    test('should return true if email exists', async () => {
      const sut = makeSut()
      const createUserParams = mockCreateUserParams()
      await usersCollection.insertOne(createUserParams)
      const exists = await sut.checkByEmail(createUserParams.email)
      expect(exists).toBe(true)
    })
  })
})
