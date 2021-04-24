export type Range = {
  min: number
  max: number
}

export interface LengthValidator {
  isLength: (input: string, range: Range) => boolean
}
