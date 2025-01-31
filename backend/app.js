const express = require("express");
const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();

const foodRoute = require("./routes/foodRoute.js");
const userRoute = require("./routes/userRoute.js");
const orderRoute = require("./routes/orderRoute.js");

const fileUpload = require("express-fileupload");

const dbUrl = process.env.ATLASDBURL;

const port = process.env.PORT||4005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
	fileUpload({
		createParentPath: true,
		useTempFiles: true,
		tempFileDir: "/tmp/",
		limits: { fileSize: 50 * 1024 * 1024 },
	})
);

main()
	.then(() => {
		console.log("DB Connected!");
	})
	.catch((err) => console.log(err));

async function main() {
	await mongoose.connect(dbUrl);
}

app.listen(port, () => {
	console.log(`Server is running at http://locahost:${port}`);
});

app.use("/food", foodRoute);
app.use("/user", userRoute);
app.use("/order", orderRoute);
