import { Authentication } from '@/domain/usecases'

import faker from 'faker'

export class AuthenticationSpy implements Authentication {
  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    return Promise.resolve(this.result)
  }
}
