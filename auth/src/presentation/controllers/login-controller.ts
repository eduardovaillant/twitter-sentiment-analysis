import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, serverError } from '@/presentation/helpers'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authenticationParams = httpRequest.body
      const result = this.validation.validate(authenticationParams.email)
      if (result.code === 400) {
        return badRequest(result.errors)
      }
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
