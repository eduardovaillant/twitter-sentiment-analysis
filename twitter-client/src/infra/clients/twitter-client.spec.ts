import { TwitterClient } from './twitter-client'
import { HttpPost, TwitterAddRuleResponse, AddRuleModel } from './twitter-client-protocols'
import env from '@/main/config/env'

const makeFakeTwitterResponse = (): any => (
  {
    data: {
      data: [{
        value: 'any_value',
        tag: 'any_tag',
        id: 'any_id'
      }]
    }
  }
)

const makeFakeTwitterAddRuleResponse = (): TwitterAddRuleResponse => ({
  value: 'any_value',
  tag: 'any_tag',
  twitter_rule_id: 'any_id'
})

const makeFakeAddRule = (): AddRuleModel => (
  {
    value: 'any_value',
    tag: 'any_tag'
  }
)

const makeFakeTwitterAddRuleBody = (): any => ({
  add: [
    {
      value: 'any_value',
      tag: 'any_tag'
    }
  ]
})

const makeHttpPostStub = (): HttpPost => {
  class HttpPostStub implements HttpPost {
    async post (data: any, url: string): Promise<any> {
      return Promise.resolve(makeFakeTwitterResponse())
    }
  }
  return new HttpPostStub()
}

interface SutTypes {
  sut: TwitterClient
  httpPostStub: HttpPost
}

const makeSut = (): SutTypes => {
  const httpPostStub = makeHttpPostStub()
  const sut = new TwitterClient(httpPostStub)
  return {
    sut,
    httpPostStub
  }
}

const config = {
  headers: { Authorization: `Bearer ${env.bearerToken}` }
}

describe('TwitterClient', () => {
  describe('Add Rule', () => {
    test('should call the twitter api with correct values ', async () => {
      const { sut, httpPostStub } = makeSut()
      const postSpy = jest.spyOn(httpPostStub, 'post')
      await sut.addRule(makeFakeAddRule())
      expect(postSpy).toHaveBeenCalledWith(env.baseUrl + 'tweets/search/stream/rules', makeFakeTwitterAddRuleBody(), config)
    })

    test('should set the rule.tag to an empty string if no tag is provided', async () => {
      const { sut, httpPostStub } = makeSut()
      const postSpy = jest.spyOn(httpPostStub, 'post')
      await sut.addRule({ value: 'any_value' })
      expect(postSpy.mock.calls[0][1]).toEqual({ add: [{ value: 'any_value', tag: '' }] })
    })

    test('should return the created rule on success', async () => {
      const { sut } = makeSut()
      const result = await sut.addRule(makeFakeAddRule())
      expect(result).toEqual(makeFakeTwitterAddRuleResponse())
    })

    test('should throw if HttpPost throws', async () => {
      const { sut, httpPostStub } = makeSut()
      jest.spyOn(httpPostStub, 'post').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.addRule(makeFakeAddRule())
      await expect(promise).rejects.toThrow()
    })
  })
})
