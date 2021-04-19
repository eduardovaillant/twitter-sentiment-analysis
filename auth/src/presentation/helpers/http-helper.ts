import { HttpResponse } from '@/presentation/protocols/http'
import { ServerError } from '../errors'

export const ok = (data: any): HttpResponse => (
  {
    statusCode: 200,
    body: {
      code: 200,
      data: data
    }
  }
)

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

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: {
      code: 500,
      type: 'ServerError',
      errors: [
        new ServerError(error.stack)
      ]
    }
  }
)
