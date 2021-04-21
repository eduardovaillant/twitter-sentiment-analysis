import { HasheComparerSpy, LoadUserByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'
import { DbAuthentication } from '@/data/usecases'

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
  hashComparerSpy: HasheComparerSpy
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const hashComparerSpy = new HasheComparerSpy()
  const sut = new DbAuthentication(loadUserByEmailRepositorySpy, hashComparerSpy)
  return {
    sut,
    loadUserByEmailRepositorySpy,
    hashComparerSpy
  }
}

describe('DbAuthentication', () => {
  test('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadUserByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if no user was found', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    loadUserByEmailRepositorySpy.result = null
    const result = await sut.auth(mockAuthenticationParams())
    expect(result).toBeNull()
  })

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadUserByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password)
    expect(hashComparerSpy.digest).toBe(loadUserByEmailRepositorySpy.result.password)
  })
})
