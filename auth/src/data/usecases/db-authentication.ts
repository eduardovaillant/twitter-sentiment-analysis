import { LoadUserByEmailRepository } from '@/data/protocols/db'
import { HashComparer } from '@/data/protocols/cryptography'
import { Authentication } from '@/domain/usecases'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadUserByEmail: LoadUserByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth (authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const user = await this.loadUserByEmail.loadByEmail(authenticationParams.email)
    if (user) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, user.password)
      if (isValid) {
        return
      }
    }
    return null
  }
}
