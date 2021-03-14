import { Controller, HttpRequest, HttpResponse, AddRule, Validation, badRequest, created, serverError } from './add-rule-controller-protocols'

export class AddRuleController implements Controller {
  constructor (
    private readonly addRule: AddRule,
    private readonly validation: Validation

  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validation.validate(httpRequest.body)
      if (!validationResult.isValid) {
        return badRequest(validationResult.errors)
      }
      const ruleModel = await this.addRule.add(httpRequest.body)
      return created(ruleModel)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
