export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/auth',
  port: process.env.PORT || 3010,
  jwtSecret: process.env.JWT_SECRET || 'tj67O==5H'
}
