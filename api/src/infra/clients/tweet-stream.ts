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
    const expansions = '?tweet.fields=created_at,lang&expansions=author_id&user.fields=created_at,description,profile_image_url,public_metrics,url'
    const streamUrl = 'https://api.twitter.com/2/tweets/search/stream' + expansions

    const stream = needle.get(streamUrl, config)

    stream.on('data', async (data) => {
      try {
        const json = JSON.parse(data)

        const tweet = {
          id: json.data.id,
          text: json.data.text,
          author_id: json.data.author_id,
          user: json.includes.users.filter(user => user.id === json.data.author_id),
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
