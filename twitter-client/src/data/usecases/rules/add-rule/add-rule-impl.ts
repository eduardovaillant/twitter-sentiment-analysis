import { TwitterAddRule, AddRuleRepository, RuleModel, AddRule, AddRuleModel } from './add-rule-impl-protocols'
export class AddRuleImpl implements AddRule {
  constructor (
    private readonly twitterClient: TwitterAddRule,
    private readonly addRuleRepository: AddRuleRepository
  ) {}

  async add (rule: AddRuleModel): Promise<RuleModel> {
    const twitterResponse = await this.twitterClient.addRule(rule)
    const createdRule = await this.addRuleRepository.addRule(twitterResponse)
    return createdRule
  }
}
