const Food = require("../models/foodModel");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUDNAME,
	api_key: process.env.APIKEY,
	api_secret: process.env.APISECRET,
});

module.exports.getFoodData = async (req, res) => {
	try {
		let allFood = await Food.find({});
		res.json({ succss: true, data: allFood });
	} catch (error) {
		res.json({ success: false, message: "EROOORRRRRR-------------" });
	}
};

module.exports.addFood = async (req, res) => {
	try {
		console.log("Request Body:", req.body);
		const file = req.files.image;
		console.log(file);

		const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);

		const newFood = new Food({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category: req.body.category,
			image: {
				url: uploadResult.url,
				filename: uploadResult.original_filename,
			},
		});

		await newFood.save();

		res
			.status(201)
			.json({ success: true, message: "Food added successfully!" });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ success: false, message: "Error occurred while saving food." });
	}
};

module.exports.deleteFood = async (req, res) => {
	try {
		let { id } = req.params;
		await Food.findByIdAndDelete(id);
		res.json({ succss: true, message: "Food Deleted Succesfully" });
	} catch (error) {
		res.json({ success: false, message: "EROOORRRRRR-------------" });
	}
};
