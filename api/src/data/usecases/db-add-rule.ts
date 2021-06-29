import { TwitterAddRule } from '@/data/protocols/adapters'
import { AddRuleRepository, LoadRuleByValueRepository } from '@/data/protocols/db/'
import { RuleModel } from '@/domain/models'
import { AddRule, AddRuleParams } from '@/domain/usecases'

export class DbAddRule implements AddRule {
  constructor (
    private readonly loadRuleByValueRepository: LoadRuleByValueRepository,
    private readonly twitterClient: TwitterAddRule,
    private readonly addRuleRepository: AddRuleRepository
  ) {}

  async add (rule: AddRuleParams): Promise<RuleModel> {
    const loadedRule = await this.loadRuleByValueRepository.loadByValue(rule.value)

    if (loadedRule) return loadedRule

    const twitterResponse = await this.twitterClient.addRule(rule)
    const createdRule = await this.addRuleRepository.addRule(twitterResponse)
    return createdRule
  }
}
