const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

try {
  sequelize = new Sequelize(config);
} catch {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.options
  );
}
const models = {
  Estate: sequelize.import("./Town.js"),
  Place: sequelize.import("./Place.js")
};

Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = {
  sequelize,
  ...models
};
