import { CheckUserByEmailRepository, CreateUserRepository, LoadUserByEmailRepository } from '@/data/protocols/db'
import { UserModel } from '@/domain/models'
import { CreateUserParams } from '@/domain/usecases'
import { mockUserModel } from '@/tests/domain/mocks'

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

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
  email: string
  userModel = mockUserModel()
  async loadByEmail (email: string): Promise<UserModel> {
    this.email = email
    return Promise.resolve(this.userModel)
  }
}
