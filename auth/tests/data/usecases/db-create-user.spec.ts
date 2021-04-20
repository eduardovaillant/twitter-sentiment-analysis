import { HasherSpy } from '@/tests/data/mocks/mock-cryptography'
import { DbCreateUser } from '@/data/usecases'
import { mockCreateUserParams } from '@/tests/domain/mocks'

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
})
