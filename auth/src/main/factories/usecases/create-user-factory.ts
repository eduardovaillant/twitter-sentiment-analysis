import { CreateUser } from '@/domain/usecases'
import { DbCreateUser } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db'
import { BcryptAdapter } from '@/infra/cryptography'

export const makeDbCreateUser = (): CreateUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const userRepository = new UserMongoRepository()
  return new DbCreateUser(bcryptAdapter, userRepository, userRepository)
}
