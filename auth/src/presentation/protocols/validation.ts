export interface ValidationResponse {
  code: number
  messages: string[]
}

export interface Validation {
  validate: (input: any) => ValidationResponse
}
