const Order = require("../models/orderModel");
const User = require("../models/userModel");

const frontendUrl = "http://localhost:5174";
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPESECRETKEY);

module.exports.placeOrder = async (req, res) => {
	try {
		const neworder = new Order({
			userid: req.body.userid,
			items: req.body.items,
			amount: req.body.amount,
			address: req.body.address,
		});
		await neworder.save();
		await User.findByIdAndUpdate(req.body.userid, { cart: {} });

		const lineItems = req.body.items.map((item) => {
			return {
				price_data: {
					currency: "inr",
					product_data: {
						name: item.name,
					},
					unit_amount: item.price * 100 * 80,
				},
				quantity: item.quantity,
			};
		});

		lineItems.push({
			price_data: {
				currency: "inr",
				product_data: {
					name: "Delivery charge",
				},
				unit_amount: 2 * 100 * 80,
			},
			quantity: 1,
		});

		const session = await stripe.checkout.sessions.create({
			line_items: lineItems,
			mode: "payment",
			success_url: `${frontendUrl}/verify?success=true&orderId=${neworder._id}`,
			cancel_url: `${frontendUrl}/verify?success=false&orderId=${neworder._id}`,
		});

		res.json({ success: true, session_url: session.url });
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "ERROR" });
	}
};

module.exports.verify = async (req, res) => {
	try {
		if (req.body.success == "true") {
			await Order.findByIdAndUpdate(req.body.orderId, { payment: true });
			res.json({ success: true, message: "Paid" });
		} else {
			await Order.findByIdAndUpdate(req.body.orderId);
			res.json({ success: false, message: "Not Paid" });
		}
	} catch (error) {
		console.log(error);
		res.json({ success: false, message: "ERROR" });
	}
};

module.exports.myOrders = async (req, res) => {
	try {
		const userorder = await Order.find({ userid: req.body.userid });
		res.json({ success: true, data: userorder });
	} catch (error) {
		console.log(error);
		res.json({ success: false, error });
	}
};
module.exports.listOrders = async (req, res) => {
	try {
		const allOrders = await Order.find({});
		res.json({ success: true, data: allOrders });
	} catch (error) {
		console.log(error);
		res.json({ success: false, error });
	}
};

module.exports.status = async (req, res) => {
	try {
		await Order.findByIdAndUpdate(req.body.orderid, {
			status: req.body.status,
		});
		res.json({ success: true, message: "Status Updated" });
	} catch (error) {
		console.log(error);
		res.json({ success: false, error });
	}
};
