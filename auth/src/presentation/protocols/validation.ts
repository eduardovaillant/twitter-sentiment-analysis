export interface ValidationResponse {
  code: number
  errors: string[]
}

export interface Validation {
  validate: (input: any) => ValidationResponse
}
