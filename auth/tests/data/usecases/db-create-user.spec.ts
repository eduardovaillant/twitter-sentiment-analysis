import { DbCreateUser } from '@/data/usecases'
import { mockCreateUserRepository, HasherSpy, mockCheckUserByEmailRepository } from '@/tests/data/mocks'
import { CreateUserRepository, CheckUserByEmailRepository } from '@/data/protocols/db'
import { mockCreateUserParams } from '@/tests/domain/mocks'

type SutTypes = {
  sut: DbCreateUser
  hasherSpy: HasherSpy
  createUserRepositoryStub: CreateUserRepository
  checkUserByEmailRepositoryStub: CheckUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const hasherSpy = new HasherSpy()
  const createUserRepositoryStub = mockCreateUserRepository()
  const checkUserByEmailRepositoryStub = mockCheckUserByEmailRepository()
  const sut = new DbCreateUser(hasherSpy, createUserRepositoryStub, checkUserByEmailRepositoryStub)
  return {
    sut,
    hasherSpy,
    createUserRepositoryStub,
    checkUserByEmailRepositoryStub
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

  test('should call CheckUserByEmailRepository with correct email', async () => {
    const { sut, checkUserByEmailRepositoryStub } = makeSut()
    const checkByEmailSpy = jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail')
    const createUserParams = mockCreateUserParams()
    await sut.create(createUserParams)
    expect(checkByEmailSpy).toHaveBeenCalledWith(createUserParams.email)
  })

  test('should return false if CheckUserByEmailRepository returns true', async () => {
    const { sut, checkUserByEmailRepositoryStub } = makeSut()
    jest.spyOn(checkUserByEmailRepositoryStub, 'checkByEmail').mockReturnValueOnce(Promise.resolve(true))
    const createUserParams = mockCreateUserParams()
    const result = await sut.create(createUserParams)
    expect(result).toBe(false)
  })
})
