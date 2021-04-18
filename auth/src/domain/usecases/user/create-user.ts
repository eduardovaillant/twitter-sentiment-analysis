import { UserModel } from '@/domain/models/user-model'

export type CreateUserParams = Omit<UserModel, 'id'>

export interface CreateUser {
  create: (createUserParams: CreateUserParams) => Promise<UserModel>
}
