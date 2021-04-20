import { CreateUser, CreateUserParams } from '@/domain/usecases'
import { Hasher } from '@/data/protocols/cryptography'
import { CreateUserRepository } from '../protocols/db'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository
  ) {}

  async create (createUserParams: CreateUserParams): Promise<boolean> {
    const hashedPassoword = await this.hasher.hash(createUserParams.password)
    await this.createUserRepository.create(Object.assign({}, createUserParams, { password: hashedPassoword }))
    return true
  }
}
