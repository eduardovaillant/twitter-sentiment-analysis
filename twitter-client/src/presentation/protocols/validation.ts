export type ValidationResponse = {
  isValid: boolean
  errors?: string[]
}

export interface Validation {
  validate: (input: any) => ValidationResponse
}
