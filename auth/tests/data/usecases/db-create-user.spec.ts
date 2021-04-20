import { mockHasher } from '@/tests/data/mocks/mock-cryptography'
import { DbCreateUser } from '@/data/usecases'
import { Hasher } from '@/data/protocols/cryptography'
import { mockCreateUserParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCreateUser
  hasherStub: Hasher
}

const makeSut = (): SutTypes => {
  const hasherStub = mockHasher()
  const sut = new DbCreateUser(hasherStub)
  return {
    sut,
    hasherStub
  }
}

describe('DbCreateUser', () => {
  test('should call Hasher with correct values', async () => {
    const { sut, hasherStub } = makeSut()
    const hashSpy = jest.spyOn(hasherStub, 'hash')
    const mockedCreateUserParams = mockCreateUserParams()
    await sut.create(mockedCreateUserParams)
    expect(hashSpy).toHaveBeenCalledWith(mockedCreateUserParams.password)
  })
})
