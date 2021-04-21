import { Authentication, CreateUserParams } from '@/domain/usecases'
import { UserModel } from '@/domain/models'

import faker from 'faker'

export const mockCreateUserParams = (): CreateUserParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockUserModel = (): UserModel => ({
  id: faker.datatype.uuid(),
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
