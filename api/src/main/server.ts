
import 'module-alias/register'
import env from '@/main/config/env'
import { MongoHelper } from '@/infra/db'
import { makeTweetStream } from './factories/infra/tweet-stream-factory'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = (await import('./config/app')).default
    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    const stream = await makeTweetStream()
    await stream.start()
  })
  .catch(console.error)
