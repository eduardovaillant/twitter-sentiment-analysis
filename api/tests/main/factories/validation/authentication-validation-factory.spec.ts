
import { makeAuthenticationValidation } from '@/main/factories'
import { ValidationComposite, RequiredFieldValidation, EmailValidation } from '@/validation/validators'
import { Validation } from '@/presentation/protocols'
import { EmailValidatorAdapter } from '@/infra/validators'

jest.mock('@/validation/validators/validation-composite')

describe('AuthenticationValidation Factory', () => {
  test('should call ValidationComposite with all validations', () => {
    makeAuthenticationValidation()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation(new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
