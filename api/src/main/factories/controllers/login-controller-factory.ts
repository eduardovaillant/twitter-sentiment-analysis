import { makeDbAuthentication, makeAuthenticationValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers'

export const makeLoginController = (): Controller => {
  return new LoginController(makeAuthenticationValidation(), makeDbAuthentication())
}
