import { Controller, HttpRequest, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequest, created, serverError } from '@/presentation/helpers'
import { AddRule } from '@/domain/usecases'

export class AddRuleController implements Controller {
  constructor (
    private readonly addRule: AddRule,
    private readonly validation: Validation

  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const ruleModel = await this.addRule.add(httpRequest.body)
      return created(ruleModel)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
