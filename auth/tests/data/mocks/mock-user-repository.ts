import { CheckUserByEmailRepository, CreateUserRepository } from '@/data/protocols/db'
import { CreateUserParams } from '@/domain/usecases'

export const mockCreateUserRepository = (): CreateUserRepository => {
  class CreateUserRepositoryStub implements CreateUserRepository {
    async create (createUserParams: CreateUserParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new CreateUserRepositoryStub()
}

export const mockCheckUserByEmailRepository = (): CheckUserByEmailRepository => {
  class CheckUserByEmailRepositoryStub implements CheckUserByEmailRepository {
    async checkByEmail (email: string): Promise<boolean> {
      return Promise.resolve(false)
    }
  }
  return new CheckUserByEmailRepositoryStub()
}
