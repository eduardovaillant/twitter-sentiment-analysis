import 'module-alias/register'
import env from './config/env'
import { makeTweetStream } from './factories/usecases/tweet-stream-factory'
import { MongoHelper } from '@/infra/db/helpers/mongo-helper'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    const stream = await makeTweetStream()
    await stream.on()
  })
  .catch(console.error)
