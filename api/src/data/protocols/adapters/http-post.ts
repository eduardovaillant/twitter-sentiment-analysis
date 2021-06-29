export interface HttpPost {
  post: (url: string, data: any, config?: any) => Promise<any>
}
