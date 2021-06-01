import { adaptRoute } from '@/main/adapters'
import { makeCreateUserController, makeLoginController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeCreateUserController()))
  router.post('/auth', adaptRoute(makeLoginController()))
}
