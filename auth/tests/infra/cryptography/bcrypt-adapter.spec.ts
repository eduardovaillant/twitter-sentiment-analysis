import { BcryptAdapter } from '@/infra/cryptography'

import bcrypt from 'bcrypt'
import faker from 'faker'

const password = faker.internet.password()
const hash = faker.datatype.uuid()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hash
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(password)
      expect(hashSpy).toHaveBeenCalledWith(password, salt)
    })

    test('should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hashedValue = await sut.hash(password)
      expect(hashedValue).toBe(hash)
    })

    test('should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.hash(password)
      await expect(promise).rejects.toThrow()
    })
  })

  describe('compare()', () => {
    test('should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(password, hash)
      expect(compareSpy).toHaveBeenCalledWith(password, hash)
    })

    test('should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare(password, hash)
      expect(isValid).toBe(true)
    })

    test('should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false)
      const isValid = await sut.compare(password, hash)
      expect(isValid).toBe(false)
    })

    test('should throw if compare throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.compare(password, hash)
      await expect(promise).rejects.toThrow()
    })
  })
})
