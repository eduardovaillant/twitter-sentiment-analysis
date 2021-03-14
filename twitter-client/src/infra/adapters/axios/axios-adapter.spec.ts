import { AxiosAdapter } from './axios-adapter'
import axios from 'axios'

jest.mock('axios', () => ({
  async post (): Promise<any> {
    return Promise.resolve({ data: 'any_data' })
  }
}))

describe('AxiosAdapter', () => {
  describe('POST', () => {
    test('should call post with correct values (without config)', async () => {
      const sut = new AxiosAdapter()
      const postSpy = jest.spyOn(axios, 'post')
      await sut.post('any_url', 'any_data')
      expect(postSpy).toHaveBeenCalledWith('any_url', 'any_data')
    })

    test('should call post with correct values (with config)', async () => {
      const sut = new AxiosAdapter()
      const postSpy = jest.spyOn(axios, 'post')
      await sut.post('any_url', 'any_data', 'any_config')
      expect(postSpy).toHaveBeenCalledWith('any_url', 'any_data', 'any_config')
    })

    test('should return the response', async () => {
      const sut = new AxiosAdapter()
      const result = await sut.post('any_url', 'any_data')
      expect(result).toEqual({ data: 'any_data' })
    })

    test('should throw if axios throws', async () => {
      const sut = new AxiosAdapter()
      jest.spyOn(axios, 'post').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.post('any_url', 'any_data')
      await expect(promise).rejects.toThrow()
    })
  })
})
