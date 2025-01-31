const express = require("express");
const router = express.Router({ mergeParams: true });

const foodController = require("../controllers/foodController");

router.get("/", foodController.getFoodData);

router.post("/", foodController.addFood);

router.delete("/:id", foodController.deleteFood);

module.exports = router;
