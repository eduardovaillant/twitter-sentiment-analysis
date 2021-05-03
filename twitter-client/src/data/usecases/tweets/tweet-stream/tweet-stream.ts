import { MessageBroker } from '@/data/usecases/message-broker/message-broker'
import { TweetModel } from '@/domain/models/tweet-model'
import { ITweetStream } from '@/domain/usecases/tweet-stream'
import env from '@/main/config/env'
import needle from 'needle'

// TODO unit tests
export class TweetStream implements ITweetStream {
  constructor (
    private readonly messageBroker: MessageBroker
  ) {}

  async on (): Promise<void> {
    const params = 'tweet.fields=created_at,lang,possibly_sensitive,public_metrics&expansions=geo.place_id,author_id&place.fields=full_name,id,country,country_code,geo,name,place_type&user.fields=created_at,description,profile_image_url,public_metrics,url,verified,location'
    const config = { headers: { Authorization: `Bearer ${env.bearerToken}` } }
    const streamUrl = 'https://api.twitter.com/2/tweets/search/stream'

    const stream = needle.get(`${streamUrl}?${params}`, config)

    stream.on('data', async (data) => {
      try {
        const json = JSON.parse(data)

        const tweet: TweetModel = {
          id: json.data.id,
          text: json.data.text,
          matching_rules: json.matching_rules
        }

        this.messageBroker.publish(JSON.stringify(tweet))
      } catch (error) {
        console.error(error)
      }
    })
  }
}
