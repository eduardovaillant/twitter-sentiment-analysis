export type Range = {
  min: number
  max: number
}

export interface LengthValidator {
  isLength: (range: Range, input: string) => boolean
}
