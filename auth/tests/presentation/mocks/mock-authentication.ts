import { Authentication, AuthenticationParams, AuthenticationResult } from '@/domain/usecases'

import faker from 'faker'

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authenticationParams: AuthenticationParams): Promise<AuthenticationResult> {
      return Promise.resolve({
        accessToken: faker.datatype.uuid(),
        name: faker.name.findName()
      })
    }
  }
  return new AuthenticationStub()
}
