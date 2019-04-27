module.exports = (sequelize, type) => {
  const Place = sequelize.define(
    "place",
    {
      id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
      category: {
        type: type.ENUM,
        values: ["health", "food", "retail", "childcare", "nature"]
      },
      name: type.STRING,
      type: type.STRING,
      postalCode: type.INTEGER,
      address: type.STRING,
      location: type.GEOMETRY("POINT", 4326)
    },
    { timestamps: false }
  );

  Place.associate = models => {};
  return Place;
};
