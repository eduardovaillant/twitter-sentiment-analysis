import dotenv from 'dotenv'
dotenv.config()

export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/twitter-client',
  port: process.env.PORT || 3000,
  baseUrl: process.env.BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  apiSecret: process.env.API_SECRET || '',
  bearerToken: process.env.BEARER_TOKEN || '',
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
}
