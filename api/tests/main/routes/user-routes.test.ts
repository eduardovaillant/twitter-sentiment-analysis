
import app from '@/main/config/app'
import { MongoHelper } from '@/infra/db'

import { Collection } from 'mongodb'
import request from 'supertest'
import bcrypt from 'bcrypt'

let usersCollection: Collection

describe('UserRoutes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    usersCollection = await MongoHelper.getCollection('users')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await usersCollection.deleteMany({})
  })

  describe('/signup', () => {
    test('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Eduardo',
          email: 'eduardo@gmail.com',
          password: '1234'
        })
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Eduardo',
          email: 'eduardo@gmail.com',
          password: '1234'
        })
        .expect(403)
    })
  })

  describe('/auth', () => {
    test('should return 200 on login', async () => {
      const password = await bcrypt.hash('123', 12)
      await usersCollection.insertOne({
        name: 'Eduardo',
        email: 'eduardo@gmail.com',
        password
      })
      await request(app)
        .post('/api/auth')
        .send({
          email: 'eduardo@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('should return 401 on login', async () => {
      await request(app)
        .post('/api/auth')
        .send({
          email: 'eduardo@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
