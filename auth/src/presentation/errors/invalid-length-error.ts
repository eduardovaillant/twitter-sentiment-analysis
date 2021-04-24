export class InvalidLengthError extends Error {
  constructor (fieldName: string, minLength: number, maxLength: number) {
    super(`The field '${fieldName} must have length between ${minLength} and ${maxLength}!'`)
    this.name = 'InvalidLengthError'
  }
}
