const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
	userid: {
		type: String,
		required: true,
	},
	items: {
		type: Array,
		required: true,
	},
	amount: {
		type: Number,
		required: true,
	},
	address: {
		type: Object,
		required: true,
	},
	status: {
		type: String,
		default: "Order in Process",
	},
	date: {
		type: Date,
		default: Date.now(),
	},
	payment: {
		type: Boolean,
		default: false,
	},
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
