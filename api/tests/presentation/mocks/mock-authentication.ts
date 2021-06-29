import { Authentication } from '@/domain/usecases'

import faker from 'faker'

export class AuthenticationSpy implements Authentication {
  authenticationParams: Authentication.Params
  result = {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName()
  }

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    this.authenticationParams = authenticationParams
    return Promise.resolve(this.result)
  }
}
