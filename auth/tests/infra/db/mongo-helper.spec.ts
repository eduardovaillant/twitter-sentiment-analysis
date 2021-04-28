import { MongoHelper as sut } from '@/infra/db'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let usersCollection = await sut.getCollection('users')
    expect(usersCollection).toBeTruthy()
    await sut.disconnect()
    usersCollection = await sut.getCollection('users')
    expect(usersCollection).toBeTruthy()
  })
})
