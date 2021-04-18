import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'

export class CreateUserController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const createUserParams = httpRequest.body
    this.validation.validate(createUserParams)
    return Promise.resolve(null)
  }
}
