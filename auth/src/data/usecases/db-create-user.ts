import { CreateUser, CreateUserParams } from '@/domain/usecases'
import { CheckUserByEmailRepository, CreateUserRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/cryptography'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository
  ) {}

  async create (createUserParams: CreateUserParams): Promise<boolean> {
    await this.checkUserByEmailRepository.checkByEmail(createUserParams.email)
    const hashedPassoword = await this.hasher.hash(createUserParams.password)
    await this.createUserRepository.create(Object.assign({}, createUserParams, { password: hashedPassoword }))
    return true
  }
}
