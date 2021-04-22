import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { serverError } from '../helpers'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const authenticationParams = httpRequest.body
      this.validation.validate(authenticationParams.email)
      return Promise.resolve(null)
    } catch (error) {
      return serverError(error)
    }
  }
}
