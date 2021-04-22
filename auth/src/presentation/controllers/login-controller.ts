import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers'
import { Authentication } from '@/domain/usecases'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authenticationParams = httpRequest.body
      const result = this.validation.validate(authenticationParams.email)
      if (result.code === 400) {
        return badRequest(result.errors)
      }
      await this.authentication.auth(authenticationParams)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
