import { HttpResponse } from '@/presentation/protocols/http'

export const badRequest = (errors: string[]): HttpResponse => (
  {
    statusCode: 400,
    body: {
      code: 400,
      errors
    }
  }
)
