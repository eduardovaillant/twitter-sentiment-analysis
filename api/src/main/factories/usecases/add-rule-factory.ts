import { AddRule } from '@/domain/usecases'
import { AddRuleImpl } from '@/data/usecases'
import { RuleMongoRepository } from '@/infra/db'
import { TwitterClient } from '@/infra/clients'
import { AxiosAdapter } from '@/infra/adapters'

export const makeAddRule = (): AddRule => {
  const httpPost = new AxiosAdapter()
  const twitterClient = new TwitterClient(httpPost)
  const ruleRepository = new RuleMongoRepository()
  return new AddRuleImpl(twitterClient, ruleRepository)
}
