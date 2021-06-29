import { HttpResponse } from '@/presentation/protocols/http'
import { ServerError, UnauthorizedError } from '@/presentation/errors'

export const ok = (data: any): HttpResponse => (
  {
    statusCode: 200,
    body: {
      code: 200,
      data: data
    }
  }
)

export const created = (data: any): HttpResponse => (
  {
    statusCode: 201,
    body: {
      code: 201,
      data: data
    }
  }
)

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: {
      code: 400,
      error: {
        type: 'ValidationError',
        error: {
          type: error.name,
          message: error.message
        }
      }
    }
  }
)

export const unauthorized = (): HttpResponse => (
  {
    statusCode: 401,
    body: {
      code: 401,
      error: {
        type: 'UnauthorizedError',
        message: new UnauthorizedError().message
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
        message: error.message
      }
    }
  }
)

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: {
      code: 500,
      error: {
        type: 'ServerError',
        stack: new ServerError(error.stack)
      }
    }
  }
)
