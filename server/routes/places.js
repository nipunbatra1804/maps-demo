const express = require("express");
const router = express.Router();
//const Sequelize = require("");
const { Place, sequelize, Estate } = require("../models");
const SqOp = sequelize.Op;

router.route("/").get(async (req, res) => {
  const { query } = req;
  let places;
  if (Object.entries(query).length === 0) {
    places = await Place.findAll({});
  } else {
    const { name, tag, loc, distance, id } = query;
    if (name) {
      places = await Place.findAll({
        where: { name: name }
      });
      return res.json(places);
    }
    if (loc) {
      places = await Place.findAll({
        where: sequelize.where(
          sequelize.fn(
            "ST_Distance_Sphere",
            sequelize.col("location"),
            sequelize.fn(
              "ST_SetSRID",
              sequelize.fn("ST_MakePoint", loc.coord[0], loc.coord[1]),
              4326
            )
          ),
          "<",
          distance
        )
      });
      return res.json(places);
    }
  }
  res.json(places);
});
router.route("/:id").get(async (req, res) => {
  const { id } = req.params;
  try {
    const retFoodOption = await Place.findOne({
      where: { id: id }
    });
    return res.status(200).json(retFoodOption);
  } catch (err) {
    return res.status(415).json("get request not in correct format");
  }
});

module.exports = router;
