import { TweetModel } from '@/domain/models'
import { MessageBroker } from '@/infra/adapters'
import env from '@/main/config/env'

import needle from 'needle'

// TODO unit tests and interfaces
export class TweetStream {
  constructor (
    private readonly messageBroker: MessageBroker
  ) {}

  async start (): Promise<void> {
    const config = { headers: { Authorization: `Bearer ${env.bearerToken}` } }
    const streamUrl = 'https://api.twitter.com/2/tweets/search/stream'

    const stream = needle.get(streamUrl, config)

    stream.on('data', async (data) => {
      try {
        const json = JSON.parse(data)

        const tweet: TweetModel = {
          id: json.data.id,
          text: json.data.text,
          matching_rules: json.matching_rules
        }

        console.log(tweet)

        this.messageBroker.publish(JSON.stringify(tweet))
      } catch (error) {
        console.error(error)
      }
    })
  }
}
