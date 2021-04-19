import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest } from '@/presentation/helpers'
import { CreateUser } from '@/domain/usecases/user'

export class CreateUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUser: CreateUser
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const createUserParams = httpRequest.body
    const result = this.validation.validate(createUserParams)
    if (result.code === 400) {
      return badRequest(result.errors)
    }
    await this.createUser.create(createUserParams)
    return null
  }
}
