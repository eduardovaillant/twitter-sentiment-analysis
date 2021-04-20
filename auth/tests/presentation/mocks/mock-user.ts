import { CreateUser, CreateUserParams } from '@/domain/usecases'

export const mockCreateUser = (): CreateUser => {
  class CreateUserStub implements CreateUser {
    async create (createUserParams: CreateUserParams): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new CreateUserStub()
}
