import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, forbidden, ok, serverError } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'
import { Authentication, CreateUser } from '@/domain/usecases'

export class CreateUserController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly createUser: CreateUser,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const createUserParams = httpRequest.body
      const error = this.validation.validate(createUserParams)
      if (error) {
        return badRequest(error)
      }
      const created = await this.createUser.create(createUserParams)
      if (!created) {
        return forbidden(new EmailInUseError())
      }
      const authenticationResult = await this.authentication.auth({
        email: createUserParams.email,
        password: createUserParams.password
      })
      return ok(authenticationResult)
    } catch (error) {
      return serverError(error)
    }
  }
}
