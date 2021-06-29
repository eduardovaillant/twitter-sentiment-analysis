import { TwitterAddRuleResponse } from '@/data/protocols'
import { RuleModel } from '@/domain/models'
import { AddRuleParams } from '@/domain/usecases/add-rule'

export const mockRuleModel = (): RuleModel => (
  {
    id: 'any_id',
    value: 'any_value',
    tag: 'any_tag',
    twitter_id: 'any_id'
  }
)

export const mockAddRuleParams = (): AddRuleParams => (
  {
    value: 'any_value',
    tag: 'any_tag'
  }
)

export const mockAddRuleResponse = (): TwitterAddRuleResponse => (
  {
    value: 'any_value',
    tag: 'any_tag',
    twitter_id: 'any_id'
  }
)
