const env = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "db_real",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
   
  module.exports = env;