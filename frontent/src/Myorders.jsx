import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { StoreContext } from "./StoreContext";

const Myorders = () => {
	const { apiUrl, token } = useContext(StoreContext);
	const [data, setdata] = useState([]);

	const getMyOrders = async () => {
		const res = await axios.get(apiUrl + "/order/myorders", {
			headers: { token },
		});
		setdata(res.data.data);
	};

	useEffect(() => {
		if (token) {
			getMyOrders();
		}
	}, [token]);

	return (
		<div className="flex flex-grow flex-col w-full max-w-screen-lg mx-auto gap-5 my-10 px-4 ">
			<h1 className="text-2xl font-bold text-center md:text-left ml-4">My Orders</h1>
			<div className="overflow-x-auto flex flex-col gap-5 px-4 ">
				{data.map((order, index) => {
					return (
						<div
							key={index}
							className="flex flex-wrap border-2 text-sm font-semibold text-gray-600 border-gray-400 justify-between text-start p-3 md:px-8 items-center gap-4 md:gap-0"
						>
							<img className="size-10" src="parcel_icon.png" alt="parcel" />
							<p className="w-96  md:w-64 text-left md:text-left">
								{order.items.map((item, index) => {
									if (index === order.items.length - 1) {
										return item.name + "x" + item.quantity;
									} else {
										return item.name + "x" + item.quantity + ", ";
									}
								})}
							</p>
							<p className="text-center">${order.amount}.00</p>
							<p className="text-center">Items: {order.items.length}</p>
							<div className="flex items-center">
								<span className="text-orange-600 text-2xl">•</span>
								<p className="font-semibold">{order.status}</p>
							</div>

							<button
								onClick={getMyOrders}
								className="bg-red-100 px-4 py-2 rounded-sm text-xs font-semibold hover:bg-red-200"
							>
								Track Order
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Myorders;
