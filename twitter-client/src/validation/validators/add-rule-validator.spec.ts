import { AddRuleValidator } from './add-rule-validator'

describe('AddRuleValidator', () => {
  test('should return an error if no value is provided', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"value" is required')
  })

  test('should return an error if value does not have the min length required', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ value: 'ad' })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"value" length must be at least 3 characters long')
  })

  test('should return an error if value length is more than the max length required', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ value: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"value" length must be less than or equal to 30 characters long')
  })

  test('should return an error if tag does not have the min length required', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ value: 'any_value', tag: 'a' })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"tag" length must be at least 3 characters long')
  })

  test('should return an error if value length is more than the max length required', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ value: 'any_value', tag: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' })
    expect(result.isValid).toBeFalsy()
    expect(result.errors[0]).toBe('"tag" length must be less than or equal to 30 characters long')
  })

  test('should return true on validation success', () => {
    const sut = new AddRuleValidator()
    const result = sut.validate({ value: 'any_value', tag: 'any_tag' })
    expect(result.isValid).toBeTruthy()
  })
})
