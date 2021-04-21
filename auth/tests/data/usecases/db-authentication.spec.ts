import { mockLoadUserByEmailRepository } from '@/tests/data/mocks'
import { DbAuthentication } from '@/data/usecases'
import { LoadUserByEmailRepository } from '@/data/protocols/db'
import { mockAuthenticationParams } from '@/tests/domain/mocks'

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
})
