import { LoadRuleByValueRepository } from '@/data/protocols/db'
import { RuleModel } from '@/domain/models'
import { mockRuleModel } from '@/tests/domain/mocks'

export class LoadRuleByValueRepositorySpy implements LoadRuleByValueRepository {
  value: string
  ruleModel = mockRuleModel()

  async loadByValue (value: string): Promise<RuleModel> {
    this.value = value
    return this.ruleModel
  }
}
