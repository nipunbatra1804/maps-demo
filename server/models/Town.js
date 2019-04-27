module.exports = (sequelize, type) => {
  const Estate = sequelize.define(
    "estate",
    {
      id: { type: type.INTEGER, primaryKey: true },
      name: type.STRING,
      type: type.STRING,
      location: type.GEOMETRY()
    },
    {
      timestamps: false,
      indexes: [{ fields: ["location"], using: "gist" }]
    }
  );

  Estate.associate = models => {};

  return Estate;
};
