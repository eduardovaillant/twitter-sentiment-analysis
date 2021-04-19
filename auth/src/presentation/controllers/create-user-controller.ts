import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'

export class CreateUserController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const createUserParams = httpRequest.body
    const result = this.validation.validate(createUserParams)
    if (result.code === 400) {
      return badRequest(result.errors)
    }
    return Promise.resolve(null)
  }
}
