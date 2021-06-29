import { CreateUserParams } from '@/domain/usecases'

export interface CreateUserRepository {
  create: (createUserParams: CreateUserParams) => Promise<boolean>
}
