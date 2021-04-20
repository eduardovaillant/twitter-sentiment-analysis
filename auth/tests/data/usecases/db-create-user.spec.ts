import { DbCreateUser } from '@/data/usecases'
import { mockCreateUserRepository, HasherSpy } from '@/tests/data/mocks'
import { CreateUserRepository } from '@/data/protocols/db'
import { mockCreateUserParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCreateUser
  hasherSpy: HasherSpy
  createUserRepositoryStub: CreateUserRepository
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const createUserRepositoryStub = mockCreateUserRepository()
  const sut = new DbCreateUser(hasherSpy, createUserRepositoryStub)
  return {
    sut,
    hasherSpy,
    createUserRepositoryStub
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

  test('should call CreateUserRepository with correct values', async () => {
    const { sut, hasherSpy, createUserRepositoryStub } = makeSut()
    const createSpy = jest.spyOn(createUserRepositoryStub, 'create')
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
    expect(createSpy).toHaveBeenCalledWith({
      name: createUserParams.name,
      email: createUserParams.email,
      password: hasherSpy.digest
    })
  })

  test('should throw if CreateUserRepository throws', async () => {
    const { sut, createUserRepositoryStub } = makeSut()
    jest.spyOn(createUserRepositoryStub, 'create').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.create(mockCreateUserParams())
    await expect(promise).rejects.toThrow()
  })
})
