import { useContext } from "react";
import { StoreContext } from "./StoreContext";
import { Link } from "react-router-dom";

const Cart = () => {
	const { food_list, cartitem, removeFromcart, getTotalCartAmount } =
		useContext(StoreContext);

	return (
		<div className="flex flex-col items-center flex-grow w-full px-6 sm:px-10 lg:px-20 py-10 overflow-x-hidden">
			<div className="grid grid-cols-6 gap-x-14 w-full max-w-5xl   text-gray-500 text-sm font-semibold py-3 border-b border-gray-400">
				<p className="text-center  hidden sm:block ">Item</p>
				<p className="text-center">Title</p>
				<p className="text-center">Price</p>
				<p className="text-center">Count</p>
				<p className="text-center">Total</p>
				<p className="text-center">Remove</p>
			</div>

			{food_list.map((item) => {
				if (cartitem[item._id] > 0) {
					return (
						<div
							key={item._id}
							className="grid grid-cols-6 gap-x-16 sm:gap-12 md:gap-16 w-full text-sm max-w-5xl items-center py-2 border-b border-gray-300"
						>
							<img
								className="h-8 mx-auto rounded-md hidden sm:block"
								src={item.image.url}
								alt={item.name}
							/>
							<p className="text-center ">{item.name}</p>
							<p className="text-center ">${item.price}</p>
							<p className="text-center">{cartitem[item._id]}</p>
							<p className="text-center">${item.price * cartitem[item._id]}</p>
							<button
								onClick={() => removeFromcart(item._id)}
								className="text-2xl text-red-500 text-center hover:text-red-700"
							>
								⨯
							</button>
						</div>
					);
				}
			})}

			<div className="flex flex-col sm:flex-row items-center justify-start mt-16 gap-16 sm:gap-10">
				<div className="flex flex-col w-full sm:w-1/2 gap-4 pl-4">
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
							${getTotalCartAmount() === 0 ? 0 : 2}
						</p>
					</div>
					<div className="flex justify-between px-1">
						<p className="font-semibold">Total</p>
						<p className="font-semibold">
							${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}
						</p>
					</div>
					<Link to={"/placeorder"}>
						<button className="w-fit py-3 bg-orange-600 text-white rounded-sm text-xs font-semibold px-6 hover:bg-orange-700 transition duration-300">
							PROCEED TO CHECKOUT
						</button>
					</Link>
				</div>

				<div className="flex flex-col gap-4 sm:gap-6 w-full sm:w-1/3">
					<p className="text-sm text-gray-500 font-semibold">
						If you have any promo code, Enter it here.
					</p>
					<div className="flex w-full">
						<input
							type="text"
							placeholder="Promo code"
							className="h-10 flex-grow py-2 px-3 bg-gray-200 rounded-sm focus:outline-none"
						/>
						<button className="h-10 px-6 bg-black text-white rounded-sm text-xs font-semibold">
							Submit
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Cart;
