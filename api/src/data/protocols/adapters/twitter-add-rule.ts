import { RuleModel } from '@/domain/models/rule-model'
import { AddRuleModel } from '@/domain/usecases/add-rule'

export type TwitterAddRuleResponse = Omit<RuleModel, 'id'>

export interface TwitterAddRule {
  addRule: (rule: AddRuleModel) => Promise<TwitterAddRuleResponse>
}
