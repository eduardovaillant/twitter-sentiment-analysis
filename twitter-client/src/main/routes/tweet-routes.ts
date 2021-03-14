import { makeAddRuleController } from '@/main/factories/controllers/add-rule-controller-factory'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/rules', adaptRoute(makeAddRuleController()))
}
