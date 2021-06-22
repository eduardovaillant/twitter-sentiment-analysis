import { makeAddRule } from '@/main/factories/usecases'
import { makeAddRuleValidation } from '@/main/factories/validation'
import { Controller } from '@/presentation/protocols'
import { AddRuleController } from '@/presentation/controllers'

export const makeAddRuleController = (): Controller => {
  return new AddRuleController(makeAddRule(), makeAddRuleValidation())
}
