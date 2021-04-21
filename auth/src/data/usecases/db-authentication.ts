import { LoadUserByEmailRepository } from '@/data/protocols/db'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmail: LoadUserByEmailRepository
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    await this.loadUserByEmail.loadByEmail(authenticationParams.email)
    return Promise.resolve(null)
  }
}
