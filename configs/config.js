module.exports = {
  server: {
    port: 3000,
  },
  mongo: {
    uri: "mongodb://localhost:27017/authtest",
    poolSize: 3,
  },
  jwt: {
    secret: "ILoveMyAuthServer",
    tokenTime: 60 * 60 * 24 * 30, // 30 days
  },
  logger: {
    folder: "C:/Code/playtests",
  },
};
