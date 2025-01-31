import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const Order = ({url}) => {
	
	const [allOrders, setallOrders] = useState([]);

	const getAllOrders = async () => {
		try {
			const response = await fetch(url+"/order/listorders");
			const data = await response.json();
			setallOrders(data.data);
			toast.success("Orders fetched successfully!");
		} catch (error) {
			console.error("Fetch error:", error);
			toast.error("Failed to fetch Orders");
		}
	};

	useEffect(() => {
		getAllOrders();
	}, []);


	const statusHandler = async(event,orderid) => {
		const res = await axios.post(url + "/order/status", { orderid, status: event.target.value });
		if (res.data.success) {
			await getAllOrders();
		}
	}


	return (
		<div className="flex flex-grow flex-col mx-36 gap-5 my-10">
			<h1 className="text-2xl font-bold">All Orders</h1>
			<div className="overflow-x-auto flex flex-col gap-5 px-4">
			{allOrders.map((order, index) => {
				return (
					<div
						key={index}
						className=" flex flex-wrap border-2 text-sm font-semibold text-gray-600 border-gray-400 justify-between text-start p-3 md:px-8 items-center gap-4 md:gap-0"
					>
						<img className="size-10" src="parcel_icon.png" alt="parcel" />
						<div className="flex flex-col gap-1">
							<p className="w-64 ">
								{order.items.map((item, index) => {
									if (index == order.items.length - 1) {
										return item.name + "x" + item.quantity;
									} else {
										return item.name + "x" + item.quantity + ",";
									}
								})}
							</p>
							<p className="font-semibold text-xl ">
								{order.address.firstname} {order.address.lastname}{" "}
							</p>
							<p>{order.address.street}</p>
							<p>
								{order.address.city} , {order.address.state} ,{" "}
								{order.address.country} , {order.address.pincode}
							</p>
							<p>{order.address.phone}</p>
						</div>

						<p>Items : {order.items.length}</p>
						<p>${order.amount}.00</p>

						<select onChange={(event) => {
							statusHandler(event, order._id);
						}} value={order.status} className="bg-red-100 px-4 py-2 rounded-sm text-xs font-semibold">
							<option value="Order in Process">Order in Process</option>
							<option value="Out for Delivery">Out for Delivery</option>
							<option value="Delivered">Delivered</option>
						</select>
					</div>
				);
			})}
			</div>
		</div>
	);
};
export default Order;
