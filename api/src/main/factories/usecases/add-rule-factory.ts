import { AddRule } from '@/domain/usecases'
import { DbAddRule } from '@/data/usecases'
import { RuleMongoRepository } from '@/infra/db'
import { TwitterClient } from '@/infra/clients'
import { AxiosAdapter } from '@/infra/adapters'

export const makeAddRule = (): AddRule => {
  const httpPost = new AxiosAdapter()
  const twitterClient = new TwitterClient(httpPost)
  const ruleRepository = new RuleMongoRepository()
  return new DbAddRule(ruleRepository, twitterClient, ruleRepository)
}
