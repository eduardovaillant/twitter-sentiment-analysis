import { UserModel } from '@/domain/models'

export type CreateUserParams = Omit<UserModel, 'id'>

export interface CreateUser {
  create: (createUserParams: CreateUserParams) => Promise<UserModel>
}
