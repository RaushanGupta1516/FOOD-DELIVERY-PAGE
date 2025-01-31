import { useContext } from "react";
import { StoreContext } from "./StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
	const { cartitem, addTocart, removeFromcart, token } =
		useContext(StoreContext);

	return (
		<div className="flex flex-col w-full sm:w-72 bg-slate-100 shadow-xl rounded-2xl gap-2 pb-5">
			<div className="relative ">
				<img
					className="rounded-t-2xl h-auto w-full"
					src={image.url}
					alt="foodpic"
				/>
				{!cartitem[id] || !token ? (
					<img
						className="absolute top-[70%] right-4 sm:top-44 h-8 cursor-pointer"
						onClick={() => addTocart(id)}
						src="add_icon_white.png"
						alt="addwhite"
					/>
				) : (
					<div className="flex absolute top-[70%] right-4 sm:top-44 bg-white w-fit gap-2 p-1 rounded-full">
						<img
							className="h-6 cursor-pointer"
							onClick={() => removeFromcart(id)}
							src="remove_icon_red.png"
							alt="removered"
						/>
						<p className="text-md font-semibold">{cartitem[id]}</p>
						<img
							className="h-6 cursor-pointer"
							onClick={() => addTocart(id)}
							src="add_icon_green.png"
							alt="addgreen"
						/>
					</div>
				)}
			</div>

			<div className="flex justify-between px-3 sm:px-5 items-center">
				<h2 className="text-lg sm:text-2xl font-semibold">{name}</h2>
				<img className="h-4" src="rating_starts.png" alt="rating" />
			</div>

			<p className="text-sm font-semibold px-3 sm:px-5 text-gray-500">
				{description}
			</p>
			<h2 className="text-lg sm:text-2xl font-semibold px-3 sm:px-5 text-orange-700">
				${price}
			</h2>
		</div>
	);
};

export default FoodItem;
