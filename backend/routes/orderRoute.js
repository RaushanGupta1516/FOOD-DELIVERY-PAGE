const express = require("express");
const router = express.Router();
const { isverified } = require("../middleware");

const orderController = require("../controllers/orderController");

router.post("/placeorder", isverified, orderController.placeOrder);

router.post("/verify", orderController.verify);

router.get("/myorders", isverified, orderController.myOrders);

router.get("/listorders", orderController.listOrders);

router.post("/status", orderController.status);

module.exports = router;
