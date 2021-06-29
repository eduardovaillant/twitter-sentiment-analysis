import { RuleModel } from '@/domain/models'

export interface LoadRuleByValueRepository {
  loadByValue: (value: string) => Promise<RuleModel>
}
