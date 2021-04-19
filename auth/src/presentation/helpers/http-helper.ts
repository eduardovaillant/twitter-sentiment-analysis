import { HttpResponse } from '@/presentation/protocols/http'

export const badRequest = (errors: string[]): HttpResponse => (
  {
    statusCode: 400,
    body: {
      code: 400,
      error: {
        type: 'ValidationError',
        messages: errors
      }
    }
  }
)

export const forbidden = (error: Error): HttpResponse => (
  {
    statusCode: 403,
    body: {
      code: 403,
      error: {
        type: error.name,
        messages: [error.message]
      }
    }
  }
)
