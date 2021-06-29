import { RuleModel } from '@/domain/models'
import { AddRuleParams } from '@/domain/usecases'

export type TwitterAddRuleResponse = Omit<RuleModel, 'id'>

export interface TwitterAddRule {
  addRule: (rule: AddRuleParams) => Promise<TwitterAddRuleResponse>
}
