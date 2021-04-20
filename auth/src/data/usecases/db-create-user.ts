import { CreateUser, CreateUserParams } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/cryptography'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher
  ) {}

  async create (createUserParams: CreateUserParams): Promise<boolean> {
    await this.hasher.hash(createUserParams.password)
    return true
  }
}
