import { RuleModel } from '@/domain/models'
import { AddRuleRepository, TwitterAddRule, TwitterAddRuleResponse } from '@/data/protocols'
import { AddRuleParams } from '@/domain/usecases'

export const mockAddRuleRepository = (): AddRuleRepository => {
  class AddRuleRepositoryStub implements AddRuleRepository {
    async addRule (rule: TwitterAddRuleResponse): Promise<RuleModel> {
      return {
        id: 'any_id',
        value: 'any_value',
        tag: 'any_tag',
        twitter_rule_id: 'any_id'
      }
    }
  }
  return new AddRuleRepositoryStub()
}

export const mockTwitterAddRule = (): TwitterAddRule => {
  class TwitterAddRuleStub implements TwitterAddRule {
    async addRule (rule: AddRuleParams): Promise<TwitterAddRuleResponse> {
      return {
        value: 'any_value',
        tag: 'any_tag',
        twitter_rule_id: 'any_id'
      }
    }
  }
  return new TwitterAddRuleStub()
}
