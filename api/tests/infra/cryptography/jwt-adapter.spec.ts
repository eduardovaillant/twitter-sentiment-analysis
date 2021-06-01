import { JwtAdapter } from '@/infra/cryptography'

import jwt from 'jsonwebtoken'
import faker from 'faker'

const token = faker.datatype.uuid()

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return token
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JwtAdapter', () => {
  test('should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    const id = faker.datatype.uuid()
    await sut.encrypt(id)
    expect(signSpy).toHaveBeenCalledWith({ sub: id }, 'secret', { expiresIn: '2h' })
  })

  test('should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt(faker.datatype.uuid())
    expect(accessToken).toBe(token)
  })

  test('should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.encrypt(faker.datatype.uuid())
    await expect(promise).rejects.toThrow()
  })
})
