import { UserModel } from '@/domain/models'
import { CreateUser, CreateUserParams } from '@/domain/usecases/user'
import { mockUserModel } from '@/tests/domain/mocks'

export const mockCreateUser = (): CreateUser => {
  class CreateUserStub implements CreateUser {
    async create (createUserParams: CreateUserParams): Promise<UserModel> {
      return Promise.resolve(mockUserModel())
    }
  }
  return new CreateUserStub()
}
