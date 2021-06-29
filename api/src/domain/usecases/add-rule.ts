import { RuleModel } from '@/domain/models/rule-model'

export type AddRuleParams = Omit<RuleModel, 'id'| 'twitter_id'>

export interface AddRule {
  add: (rule: AddRuleParams) => Promise<RuleModel>
}
