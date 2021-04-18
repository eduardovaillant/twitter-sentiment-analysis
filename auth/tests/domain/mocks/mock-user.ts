import { CreateUserParams } from '@/domain/usecases/user'

import faker from 'faker'

export const mockCreateUserParams = (): CreateUserParams => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
