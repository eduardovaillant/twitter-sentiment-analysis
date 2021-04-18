import { UserModel } from '@/domain/models/user-model'

type CreateUserParams = Omit<UserModel, 'id'>

export interface CreateUser {
  create: (createUserParams: CreateUserParams) => Promise<UserModel>
}
