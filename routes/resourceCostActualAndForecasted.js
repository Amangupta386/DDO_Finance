const express = require("express");
const router = express.Router();

const ActualForecastedResource = require("../controllers/combine/wttEmp_actualAndForecastedController");

router.route("/").post(ActualForecastedResource.sumOfMonthToActualResources).post(ActualForecastedResource.sumOfMonthToForecastedResources);

router.route("/:id").patch(ActualForecastedResource.sumOfMonthToActualResources).patch(ActualForecastedResource.sumOfMonthToForecastedResources);

module.exports = router;