import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, ok, serverError, unauthorized } from '@/presentation/helpers'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authenticationParams = httpRequest.body
      const error = this.validation.validate(authenticationParams)
      if (error) {
        return badRequest(error)
      }
      const authenticationResult = await this.authentication.auth(authenticationParams)
      if (!authenticationResult) {
        return unauthorized()
      }
      return ok(authenticationResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
