import { makeTweetsMessageBroker } from './message-broker-factory'
import { TweetStream } from '@/infra/clients'

export const makeTweetStream = async (): Promise<TweetStream> => {
  const messageBroker = await makeTweetsMessageBroker()
  const stream = new TweetStream(messageBroker)
  return stream
}
