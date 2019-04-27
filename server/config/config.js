module.exports = {
  development: {
    username: "postgres",
    password: "",
    database: "maps-db",
    options: {
      dialect: "postgres",
      logging: false
    }
  },
  test: {
    username: "postgres",
    password: "",
    database: "maps-test",
    options: {
      dialect: "postgres",
      logging: false
    }
  },
  production: {
    url: process.env.DATABASE_URL,
    options: {
      dialect: "postgres"
    }
  }
};
