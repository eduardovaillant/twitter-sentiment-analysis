import { LoadUserByEmailRepository } from '@/data/protocols/db'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmail: LoadUserByEmailRepository
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.loadUserByEmail.loadByEmail(authenticationParams.email)
    if (user) {
      return null
    }
    return null
  }
}
