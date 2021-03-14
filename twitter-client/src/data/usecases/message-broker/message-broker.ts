import { Channel } from 'amqplib'

// TODO create interface and unit tests
export class MessageBroker {
  constructor (
    private readonly channel: Channel,
    private readonly queue: string
  ) {}

  publish (msg: string): void {
    this.channel.sendToQueue(this.queue, Buffer.from(msg))
  }
}
