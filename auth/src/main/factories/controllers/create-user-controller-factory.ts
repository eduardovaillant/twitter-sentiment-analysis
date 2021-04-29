import { makeDbCreateUser, makeCreateUserValidation, makeDbAuthentication } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { CreateUserController } from '@/presentation/controllers'

export const makeCreateUserController = (): Controller => {
  return new CreateUserController(makeCreateUserValidation(), makeDbCreateUser(), makeDbAuthentication())
}
