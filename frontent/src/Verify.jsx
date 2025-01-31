import { useNavigate, useSearchParams } from "react-router-dom";

import { useContext, useEffect } from "react";
import axios from "axios";
import { StoreContext } from "./StoreContext";

const Verify = () => {
	const { apiUrl } = useContext(StoreContext);
	const [params, setparams] = useSearchParams();
	const success = params.get("success");
	const orderId = params.get("orderId");
	const navigate = useNavigate();
	const verifyPayment = async () => {
		const res = await axios.post(apiUrl + "/order/verify", {
			success,
			orderId,
		});
		if (res.data.success) {
			navigate("/myorders");
		} else {
			navigate("/");
		}
	};

	useEffect(() => {
		verifyPayment();
	}, []);

	return (
		<div className="flex flex-grow items-center justify-center min-h-screen">
			<div className="w-12 h-12 border-4 border-orange-700 rounded-full animate-spin"></div>
		</div>
	);
};
export default Verify;
