const { sequelize } = require("./models");
const app = require("./app");
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const port = process.env.PORT;

sequelize.sync().then(async () => {
  /*await createFoodOptions();
  await createHealthOptions();
  await createShopOptions();
  await seedNeighbourhoods();*/
  app.listen(port, () => {
    if (process.env.NODE_ENV === "production") {
      console.log(`Server is running on Heroku with port number ${port}`);
    } else {
      console.log(`Server is running on http://localhost:${port}`);
    }
  });
});
