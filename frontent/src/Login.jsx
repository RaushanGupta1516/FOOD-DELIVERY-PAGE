import { useContext, useState } from "react";
import { StoreContext } from "./StoreContext";
import { toast } from "react-toastify";
import axios from "axios";
const Login = ({ setshowLogin }) => {
	const { apiUrl, setToken } = useContext(StoreContext);
	const [page, setPage] = useState("Sign up");
	const [data, setdata] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleOnchange = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setdata((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		let newApiUrl = apiUrl;
		if (page === "Login") {
			newApiUrl += "/user/login";
		} else {
			newApiUrl += "/user/signup";
		}
		const res = await axios.post(newApiUrl, data);
		if (res.data.success) {
			setshowLogin(false);
			setToken(res.data.token);
			localStorage.setItem("token", res.data.token);
			toast.success("Logged in successfully");
		} else {
			console.error("Error");
			toast.error("Logging Failed");
		}
	};

	return (
		<div className="fixed px-6 inset-0 flex items-center justify-center  bg-black bg-opacity-50 z-50">
			<div className="bg-white w-80 max-w-md p-5 flex flex-col gap-5 rounded-lg shadow-lg relative">
				{/* Close Button */}
				<button
					onClick={() => setshowLogin(false)}
					className="absolute top-2 right-6 text-3xl text-black "
				>
					⨯
				</button>

				<h2 className="text-2xl font-semibold">{page}</h2>
				<form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
					{page === "Sign up" && (
						<input
							onChange={handleOnchange}
							type="text"
							name="name"
							id="name"
							value={data.name}
							placeholder="Username"
							required
							className="w-full h-9 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
						/>
					)}
					<input
						onChange={handleOnchange}
						type="text"
						name="email"
						id="mail"
						value={data.email}
						placeholder="Email address"
						required
						className="w-full h-9 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
					/>
					<input
						onChange={handleOnchange}
						type="password"
						name="password"
						value={data.password}
						id="password"
						placeholder="Password"
						required
						className="w-full h-9 border border-gray-300 rounded-md px-2 text-sm focus:outline-none focus:ring-1 focus:ring-orange-400"
					/>
					<button
						type="submit"
						className="w-full h-10 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700 transition duration-300"
					>
						{page === "Sign up" ? "Create Account" : "Login now"}
					</button>
					<div className="flex items-center gap-2 text-sm">
						<input
							type="checkbox"
							name="check"
							id="check"
							required
							className="h-4 w-4 cursor-pointer"
						/>
						<p>Agree to the terms of use & privacy policy.</p>
					</div>
					<p className="text-sm text-center">
						{page === "Sign up" ? (
							<>
								Already have an account?{" "}
								<a
									onClick={() => setPage("Login")}
									href="#"
									className="text-orange-600 cursor-pointer hover:text-orange-700"
								>
									Login here
								</a>
							</>
						) : (
							<>
								Create an Account?{" "}
								<a
									onClick={() => setPage("Sign up")}
									href="#"
									className="text-orange-600 cursor-pointer hover:text-orange-700"
								>
									Click here
								</a>
							</>
						)}
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
