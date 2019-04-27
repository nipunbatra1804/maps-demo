const express = require("express");
const router = express.Router();
const towns = require("./towns");
const places = require("./places");
const estateInfo = require("./estateinfo");
const cors = require("../middleware/cors");
const morgan = require("morgan");

router.use(cors);
router.use(morgan("tiny"));
router.use(express.static("public"));
router.use(express.json());
router.route("/").get((req, res) => {
  res.status(200);
  res.send("Hi");
});
router.use("/towns", towns);
router.use("/places", places);
router.use("/estateinfo", estateInfo);
module.exports = router;
