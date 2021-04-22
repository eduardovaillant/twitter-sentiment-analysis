import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const authenticationParams = httpRequest.body
    this.validation.validate(authenticationParams.email)
    return Promise.resolve(null)
  }
}
