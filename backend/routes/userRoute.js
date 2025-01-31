const express = require("express");
const router = express.Router();

const { isverified } = require("../middleware");

const userController = require("../controllers/userController");

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/cart", isverified, userController.addToCart);

router.delete("/cart", isverified, userController.removeFromCart);

router.get("/cart", isverified, userController.getCartData);

module.exports = router;
