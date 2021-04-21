import { HasheComparerSpy, LoadUserByEmailRepositorySpy } from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'
import { DbAuthentication } from '@/data/usecases'
import { HashComparer } from '@/data/protocols/cryptography'

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy
  hashComparerSpy: HashComparer
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
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepositorySpy, 'loadByEmail')
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadByEmailSpy).toHaveBeenCalledWith(authenticationParams.email)
  })

  test('should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if no user was found', async () => {
    const { sut, loadUserByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadUserByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const authenticationParams = mockAuthenticationParams()
    const result = await sut.auth(authenticationParams)
    expect(result).toBeNull()
  })

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadUserByEmailRepositorySpy } = makeSut()
    const compareSpy = jest.spyOn(hashComparerSpy, 'compare')
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(compareSpy).toHaveBeenCalledWith(authenticationParams.password, loadUserByEmailRepositorySpy.userModel.password)
  })
})
