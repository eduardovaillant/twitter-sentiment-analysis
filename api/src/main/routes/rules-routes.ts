import { adaptRoute } from '@/main/adapters'
import { makeAddRuleController } from '@/main/factories'

import { Router } from 'express'

export default (router: Router): void => {
  router.post('/rules', adaptRoute(makeAddRuleController()))
}
