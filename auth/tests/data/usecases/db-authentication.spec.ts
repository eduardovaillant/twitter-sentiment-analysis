import { mockLoadUserByEmailRepository } from '@/tests/data/mocks'
import { mockAuthenticationParams } from '@/tests/domain/mocks'
import { DbAuthentication } from '@/data/usecases'
import { LoadUserByEmailRepository } from '@/data/protocols/db'

type SutTypes = {
  sut: DbAuthentication
  loadUserByEmailRepository: LoadUserByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadUserByEmailRepository = mockLoadUserByEmailRepository()
  const sut = new DbAuthentication(loadUserByEmailRepository)
  return {
    sut,
    loadUserByEmailRepository
  }
}

describe('DbAuthentication', () => {
  test('should call LoadUserByEmailRepository with correct email', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    const loadByEmailSpy = jest.spyOn(loadUserByEmailRepository, 'loadByEmail')
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadByEmailSpy).toHaveBeenCalledWith(authenticationParams.email)
  })

  test('should throw if LoadUserByEmailRepository throws', async () => {
    const { sut, loadUserByEmailRepository } = makeSut()
    jest.spyOn(loadUserByEmailRepository, 'loadByEmail').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
})
