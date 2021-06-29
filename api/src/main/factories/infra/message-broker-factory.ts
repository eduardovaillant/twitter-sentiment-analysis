
import { MessageBroker } from '@/infra/adapters'
import amqp from 'amqplib'

export const makeTweetsMessageBroker = async (): Promise<MessageBroker> => {
  const queue = 'tweets'
  const connection = await amqp.connect('amqp://localhost')
  const channel = await connection.createChannel()
  await channel.assertQueue('tweets', { durable: true })
  const messageBroker = new MessageBroker(channel, queue)
  return messageBroker
}
