import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "./StoreContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const PlaceOrder = () => {
	const { getTotalCartAmount, food_list, cartitem, apiUrl, token } =
		useContext(StoreContext);
	const [data, setdata] = useState({
		firstname: "",
		lastname: "",
		email: "",
		street: "",
		city: "",
		pincode: "",
		state: "",
		country: "",
		phone: "",
	});
	const handleOnchange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setdata((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		let orderedItems = [];
		food_list.map((item) => {
			if (cartitem[item._id] > 0) {
				let itemInfo = item;
				itemInfo["quantity"] = cartitem[item._id];
				orderedItems.push(itemInfo);
			}
		});
		let orderData = {
			address: data,
			items: orderedItems,
			amount: getTotalCartAmount() + 4,
		};

		try {
			const res = await axios.post(apiUrl + "/order/placeorder", orderData, {
				headers: { token },
			});
			if (res.data.success) {
				toast.success("suces");
				const { session_url } = res.data;
				window.location.replace(session_url);
			} else {
				console.error("Error:", res.data.message);
				toast.error("ERRORR");
			}
		} catch (error) {
			console.error("API Error:", error.response?.data || error.message);
		}
	};

	const navigate = useNavigate();

	useEffect(() => {
		if (!token) {
			navigate("/cart");
			toast.error("You are not Logged in");
		} else if (getTotalCartAmount() == 0) {
			navigate("/cart");
			toast.error("Add some items in cart");
		}
	}, [token]);

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col flex-grow px-4 sm:flex-row w-full items-center mt-10 mb-10 gap-8 lg:gap-44 justify-center sm:px-10"
		>
			<div className="flex flex-col w-10/12 gap-3 sm:w-full lg:w-auto">
				<h1 className="text-3xl font-semibold">Delivery Information</h1>
				<div className="flex flex-col sm:flex-row gap-2 w-full">
					<input
						name="firstname"
						value={data.firstname}
						onChange={handleOnchange}
						className="h-9 sm:w-1/2 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						type="text"
						placeholder="FirstName"
						required
					/>
					<input
						name="lastname"
						value={data.lastname}
						onChange={handleOnchange}
						className="h-9 border sm:w-1/2 border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						type="text"
						placeholder="LastName"
						required
					/>
				</div>
				<input
					name="email"
					value={data.email}
					onChange={handleOnchange}
					className="h-9 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
					type="email"
					placeholder="Email"
					required
				/>
				<input
					name="street"
					value={data.street}
					onChange={handleOnchange}
					className="h-9 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
					type="text"
					placeholder="Street"
					required
				/>
				<div className="flex flex-col sm:flex-row gap-2">
					<input
						name="city"
						value={data.city}
						onChange={handleOnchange}
						className="h-9 border sm:w-1/2 border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						type="text"
						placeholder="City"
						required
					/>
					<input
						name="state"
						value={data.state}
						onChange={handleOnchange}
						className="h-9 border sm:w-1/2 border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						type="text"
						placeholder="State"
						required
					/>
				</div>
				<div className="flex flex-col sm:flex-row gap-2 w-full">
					<input
						name="pincode"
						value={data.pincode}
						onChange={handleOnchange}
						className="h-9 border border-gray-300 sm:w-1/2 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						type="number"
						placeholder="Pincode"
						required
					/>
					<input
						name="country"
						value={data.country}
						onChange={handleOnchange}
						className="h-9 border border-gray-300 sm:w-1/2 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						type="text"
						placeholder="Country"
						required
					/>
				</div>
				<input
					name="phone"
					value={data.phone}
					onChange={handleOnchange}
					className="h-9 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
					type="number"
					placeholder="Phone"
					required
				/>
			</div>
			<div className="flex flex-col w-10/12 sm:w-full lg:w-1/3 gap-4 pl-4">
				<h1 className="text-2xl font-bold">Cart Total</h1>
				<div className="flex justify-between border-b border-gray-300 pb-2 px-1">
					<p className="text-gray-700 text-sm font-semibold">SubTotal</p>
					<p className="text-gray-700 text-sm font-semibold">
						${getTotalCartAmount()}
					</p>
				</div>
				<div className="flex justify-between border-b border-gray-300 pb-2 px-1">
					<p className="text-gray-700 text-sm font-semibold">Delivery fee</p>
					<p className="text-gray-700 text-sm font-semibold">
						${getTotalCartAmount() == 0 ? 0 : 2}
					</p>
				</div>
				<div className="flex justify-between px-1">
					<p className="font-semibold">Total</p>
					<p className="font-semibold">
						${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
					</p>
				</div>
				<button
					type="submit"
					className="w-fit py-3 bg-orange-600 text-white rounded-sm text-xs font-semibold px-6 hover:bg-orange-700 transition duration-300"
				>
					PROCEED TO CHECKOUT
				</button>
			</div>
		</form>
	);
};

export default PlaceOrder;
