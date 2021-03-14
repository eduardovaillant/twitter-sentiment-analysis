import { Validation, ValidationResponse } from '@/presentation/protocols'
import Joi from 'joi'

// TODO Improve this validation
export class AddRuleValidator implements Validation {
  validate (input: any): ValidationResponse {
    const schema = Joi.object({
      value: Joi.string()
        .min(3)
        .max(30)
        .required(),
      tag: Joi.string()
        .min(3)
        .max(30)
    })
    const result = schema.validate(input, { abortEarly: false })

    if (result.error) {
      const errors = result.error.message.split('.')
      return {
        isValid: false,
        errors
      }
    }
    return { isValid: true }
  }
}
