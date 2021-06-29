import { mockRuleModel } from '@/tests/domain/mocks'

import { RuleModel } from '@/domain/models'
import { AddRule, AddRuleParams } from '@/domain/usecases'

export class AddRuleSpy implements AddRule {
  rule: AddRuleParams
  result = mockRuleModel()

  async add (rule: AddRuleParams): Promise<RuleModel> {
    this.rule = rule
    return this.result
  }
}
