export default () => ({
  nodeEnv: process.env.NODE_ENV,

  port: parseInt(process.env.PORT || String(7000), 10) || 7000,

  dbUser: process.env.DB_USER as string,
  dbPassword: process.env.DB_PASSWORD as string,
  dbName: process.env.DB_NAME as string,
  dbPort: parseInt(process.env.DB_PORT as string),
  dbHost: process.env.DB_HOST as string,

  tokenExpiration: process.env.JWT_EXPIRATION || "15d",

  jwtSecret: process.env.JWT_SECRET,

  frontEnd: process.env.FRONT_END,
});
