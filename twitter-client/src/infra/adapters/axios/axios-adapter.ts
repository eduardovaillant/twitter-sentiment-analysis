import { HttpPost } from '@/data/protocols/http-client/http-post'
import axios, { AxiosResponse } from 'axios'

export class AxiosAdapter implements HttpPost {
  async post (url: string, data: any, config?: any): Promise<any> {
    let response: AxiosResponse<any>
    if (config) {
      response = await axios.post(url, data, config)
    } else {
      response = await axios.post(url, data)
    }
    return response
  }
}
