import { Controller } from '@/presentation/protocols'
import { AddRuleController } from '@/presentation/controllers/add-rule/add-rule-controller'
import { AddRuleImpl } from '@/data/usecases/rules/add-rule/add-rule-impl'
import { AxiosAdapter } from '@/infra/adapters/axios/axios-adapter'
import { TwitterClient } from '@/infra/clients/twitter-client'
import { TweetRepository } from '@/infra/db/tweet/tweet-repository'
import { AddRuleValidator } from '@/validation/validators/add-rule-validator'

export const makeAddRuleController = (): Controller => {
  const axiosAdapter = new AxiosAdapter()
  const twitterClient = new TwitterClient(axiosAdapter)
  const addRuleRepository = new TweetRepository()
  const addRule = new AddRuleImpl(twitterClient, addRuleRepository)
  const validation = new AddRuleValidator()
  const controller = new AddRuleController(addRule, validation)
  return controller
}
