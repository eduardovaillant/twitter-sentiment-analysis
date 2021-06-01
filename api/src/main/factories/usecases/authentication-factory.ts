import env from '@/main/config/env'
import { Authentication } from '@/domain/usecases'
import { DbAuthentication } from '@/data/usecases'
import { UserMongoRepository } from '@/infra/db'
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const userRepository = new UserMongoRepository()
  return new DbAuthentication(userRepository, bcryptAdapter, jwtAdapter)
}
