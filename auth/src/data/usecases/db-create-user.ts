import { CheckUserByEmailRepository, CreateUserRepository } from '@/data/protocols/db'
import { Hasher } from '@/data/protocols/cryptography'
import { CreateUser, CreateUserParams } from '@/domain/usecases'

export class DbCreateUser implements CreateUser {
  constructor (
    private readonly hasher: Hasher,
    private readonly createUserRepository: CreateUserRepository,
    private readonly checkUserByEmailRepository: CheckUserByEmailRepository
  ) {}

  async create (createUserParams: CreateUserParams): Promise<boolean> {
    const exists = await this.checkUserByEmailRepository.checkByEmail(createUserParams.email)
    let isValid = false
    if (!exists) {
      const hashedPassoword = await this.hasher.hash(createUserParams.password)
      isValid = await this.createUserRepository.create({ ...createUserParams, password: hashedPassoword })
    }
    return isValid
  }
}
