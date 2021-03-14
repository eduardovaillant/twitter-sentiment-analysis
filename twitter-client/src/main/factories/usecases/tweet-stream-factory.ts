import { makeTweetsMessageBroker } from './message-broker-factory'
import { TweetStream } from '@/data/usecases/tweets/tweet-stream/tweet-stream'

export const makeTweetStream = async (): Promise<TweetStream> => {
  const messageBroker = await makeTweetsMessageBroker()
  const stream = new TweetStream(messageBroker)
  return stream
}
