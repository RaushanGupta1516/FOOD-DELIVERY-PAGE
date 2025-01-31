import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
const List = ({url}) => {
	const [listitems, setListItems] = useState([]);

	const getListitems = async () => {
		try {
			const response = await fetch(url + "/food");
			const data = await response.json();
			setListItems(data.data);
			toast.success("Data fetched successfully!");
		} catch (error) {
			console.error("Fetch error:", error);
			toast.error("Failed to fetch data");
		}
	};

	useEffect(() => {
		getListitems();
	}, []);

	const removeFromlist = async (foodid) => {
		try {
			const res = await axios.delete(`${url}/food/${foodid}`);
			await getListitems();
			if (res.data.success) {
				toast.success(res.data.message);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.error("Delete error:", error);
			toast.error("Failed to delete item");
		}
	};

	return (
		<div className="w-screen p-20">
			<div className="flex flex-col items-center flex-grow w-fit border border-gray-500">
				<div className="grid grid-cols-5 pl-10 gap-20 sm:gap-x-10 w-full max-w-5xl bg-gray-100 text-black text-sm font-semibold py-3 border-b border-gray-400">
					<p className="text-center hidden md:block ">Item</p>
					<p className="text-center">Title</p>
					<p className="text-center">Category</p>
					<p className="text-center">Price</p>
					<p className="text-center">Remove</p>
				</div>

				{listitems.map((item) => {
					return (
						<div
							key={item._id}
							className="grid grid-cols-5 gap-x-24 pl-10 sm:gap-x-12 md:gap-16 gap-20 w-full text-sm max-w-5xl items-center py-2 border-b border-gray-300"
						>
							<img
								className="h-8 mx-auto rounded-md hidden md:block "
								src={item.image.url}
								alt={item.name}
							/>
							<p className="text-center">{item.name}</p>
							<p className="text-center">{item.category}</p>
							<p className="text-center">${item.price}</p>

							<button
								onClick={() => removeFromlist(item._id)}
								className="text-2xl text-red-500 hover:text-red-700 cursor-pointer"
							>
								⨯
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default List;
