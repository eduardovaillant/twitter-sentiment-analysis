import { UserModel } from '@/domain/models'

export interface LoadUserByEmailRepository {
  loadByEmail: (email: string) => Promise<UserModel>
}
