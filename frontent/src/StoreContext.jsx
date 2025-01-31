import { createContext, useEffect, useState } from "react";
import axios from "axios";

import { toast } from "react-toastify";

export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
	const [cartitem, setcartitem] = useState({});
	const apiUrl = "https://food-delivery-page-backend.onrender.com";
	const [token, setToken] = useState("");
	const [food_list, setfood_list] = useState([]);

	const getFoodList = async () => {
		try {
			let res = await axios.get(apiUrl + "/food");
			setfood_list(res.data.data);
		} catch (error) {
			console.log(err);
		}
	};

	const getCartData = async (token) => {
		if (token) {
			try {
				let res = await axios.get(apiUrl + "/user/cart", { headers: { token } });
				setcartitem(res.data.cartdata);
			} catch (error) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		const loadFoodList = async () => {
			await getFoodList();
			if (localStorage.getItem("token")) {
				setToken(localStorage.getItem("token"));
				await getCartData(localStorage.getItem("token"));
			}
		};
		loadFoodList();
	}, [token]);

	const addTocart = async (itemid) => {
		if (token) {
			if (!cartitem[itemid]) {
				setcartitem((prev) => ({ ...prev, [itemid]: 1 }));
			} else {
				setcartitem((prev) => ({ ...prev, [itemid]: prev[itemid] + 1 }));
			}

			try {
				const res = await axios.post(
					apiUrl + "/user/cart",
					{ itemid },
					{ headers: { token } }
				);
				if (res.data.success) {
					toast.success(res.data.message);
				} else {
					toast.error(res.data.message); 
				}
			} catch (error) {
				console.error("Error adding to cart: ", error);
				toast.error("An error occurred while adding to the cart."); 
			}
		} else {
			toast.error("You are not logged in");
		}
	};

	const removeFromcart = async (itemid) => {
		setcartitem((prev) => {
		
			const updatedCount = prev[itemid] > 1 ? prev[itemid] - 1 : 0;
			return { ...prev, [itemid]: updatedCount };
		});

		try {
	
			const res = await axios.delete(apiUrl + "/user/cart", {
				data: { itemid },
				headers: { token },
			});

			if (res.data.success) {
				toast.success(res.data.message);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.error("Error removing from cart: ", error);
			toast.error("An error occurred while removing from the cart.");
		}
	};

	const getTotalCartAmount = () => {
		let amt = 0;
		for (let item in cartitem) {
			if (cartitem[item] > 0) {
				let itemdetail = food_list.find((prod) => prod._id === item);
				amt += itemdetail.price * cartitem[item];
			}
		}
		return amt;
	};
	const contextVal = {
		food_list,
		cartitem,
		setcartitem,
		addTocart,
		removeFromcart,
		getTotalCartAmount,
		apiUrl,
		token,
		setToken,
	};
	return (
		<StoreContext.Provider value={contextVal}>
			{props.children}
		</StoreContext.Provider>
	);
};
export default StoreContextProvider;
