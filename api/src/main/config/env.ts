export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/auth',
  port: process.env.PORT || 3010,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H',
  baseUrl: process.env.BASE_URL || '',
  apiKey: process.env.API_KEY || '',
  apiSecret: process.env.API_SECRET || '',
  bearerToken: process.env.BEARER_TOKEN || '',
  accessToken: process.env.ACCESS_TOKEN || '',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || ''
}
