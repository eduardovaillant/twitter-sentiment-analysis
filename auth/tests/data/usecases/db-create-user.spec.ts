import { HasherSpy } from '@/tests/data/mocks/mock-cryptography'
import { mockCreateUserParams } from '@/tests/domain/mocks'
import { DbCreateUser } from '@/data/usecases'

type SutTypes = {
  sut: DbCreateUser
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const sut = new DbCreateUser(hasherSpy)
  return {
    sut,
    hasherSpy
  }
}

describe('DbCreateUser', () => {
  test('should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut()
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
    expect(hasherSpy.plaintext).toBe(createUserParams.password)
  })

  test('should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })
})
