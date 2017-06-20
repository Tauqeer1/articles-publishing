export default  {
  jwtSecret: 'jwtsecretforarticlespublishingapp',
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/articlesDB',
  port: process.env.PORT || 8000
};
