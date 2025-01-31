import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
	const [image, setimage] = useState(null);
	const [data, setdata] = useState({
		name: "",
		description: "",
		price: "",
		category: "Salad",
	});

	const handleOnchange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setdata((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append("name", data.name);
		formData.append("description", data.description);
		formData.append("price", Number(data.price));
		formData.append("category", data.category);
		if (image) formData.append("image", image);

		try {
			const res = await axios.post(url + "/food", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			console.log("API Response:", res.data);
			if (res.data.success) {
				setdata({ name: "", description: "", price: "", category: "Salad" });
				setimage(null);
				toast.success(res.data.message);
			} else {
				console.error("Error:", res.data.message);
				toast.error(res.data.message);
			}
		} catch (error) {
			console.error("API Error:", error.response?.data || error.message);
		}
	};
	return (
		<div className="flex justify-center items-center  px-4 sm:px-8 md:px-16 lg:px-24">
			<form
				className="flex flex-col w-full max-w-lg gap-3 text-gray-500 font-semibold"
				onSubmit={handleSubmit}
			>
				<label htmlFor="upload">
					Upload Image
					<img
						className="cursor-pointer w-28 h-24 rounded-md mt-2 object-cover"
						src={image ? URL.createObjectURL(image) : "upload_area.png"}
						alt="upload"
					/>
				</label>
				<input
					onChange={(e) => setimage(e.target.files[0])}
					type="file"
					name="image"
					id="upload"
					required
					hidden
				/>

				<label htmlFor="name">Product Name</label>
				<input
					onChange={handleOnchange}
					type="text"
					name="name"
					id="name"
					required
					placeholder="Enter Your Product Name"
					value={data.name}
					className="w-full h-9 border border-gray-300 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
				/>

				<label htmlFor="description">Description</label>
				<textarea
					onChange={handleOnchange}
					required
					name="description"
					id="description"
					value={data.description}
					placeholder="Write Product Description"
					className="w-full resize-none h-32 border border-gray-300 px-2 pt-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
				></textarea>

				<div className="flex flex-col sm:flex-row gap-4">
					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="category">Category</label>
						<select
							value={data.category}
							onChange={handleOnchange}
							name="category"
							id="category"
							required
							className="w-full h-9 border border-gray-300 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						>
							<option value="Sandwich">Sandwich</option>
							<option value="Salad">Salad</option>
							<option value="Rolls">Rolls</option>
							<option value="Deserts">Deserts</option>
							<option value="Cake">Cake</option>
							<option value="Pure Veg">Pure Veg</option>
							<option value="Pasta">Pasta</option>
							<option value="Noodles">Noodles</option>
						</select>
					</div>

					<div className="flex flex-col gap-2 w-full">
						<label htmlFor="price">Price</label>
						<input
							onChange={handleOnchange}
							value={data.price}
							className="w-full h-9 border border-gray-300 px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
							type="number"
							name="price"
							id="price"
							required
							placeholder="$10"
						/>
					</div>
				</div>

				<button
					type="submit"
					className="h-8 w-full sm:w-fit mt-4 px-10 cursor-pointer bg-black text-white text-center text-xs font-semibold"
				>
					ADD
				</button>
			</form>
		</div>
	);
};

export default Add;
