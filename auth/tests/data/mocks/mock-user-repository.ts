import { CreateUserRepository } from '@/data/protocols/db'
import { CreateUserParams } from '@/domain/usecases'

export const mockCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create (createUserParams: CreateUserParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new CreateUserRepositoryStub()
}
