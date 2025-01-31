

import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "./StoreContext";
import { toast } from "react-toastify";
import AnchorLink from "react-anchor-link-smooth-scroll";

const Nav = ({ setshowLogin }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [showProfileMenu, setShowProfileMenu] = useState(false);
	const { token, setToken, getTotalCartAmount, setcartitem } = useContext(StoreContext);
	const navigate = useNavigate();
	
	const logOut = () => {
		localStorage.removeItem("token");
		setToken("");
		navigate("/");
		setcartitem({});
		toast.success("Logged out successfully");
	};

	
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (!event.target.closest(".profile-menu")) {
				setShowProfileMenu(false);
			}
		};
		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, []);

	return (
		<div className="flex justify-between items-center py-4 px-6 mb-3 md:px-16 lg:px-32 relative">
			
			<Link to={"/"}>
				<div className="flex items-center gap-3">
					<img src="icon.svg" alt="logo" className="h-8 sm:h-10" />
					<h1 className="text-2xl sm:text-3xl text-orange-700 font-bold">Eatzy</h1>
				</div>
			</Link>

		
			<div className="hidden md:flex">
				<ul className="flex justify-center gap-5 font-semibold text-sm lg:text-base">
					<Link to={"/"}>
					<li>Home</li>
					</Link>
					<AnchorLink href="#menu" className="anchorlink">
						<li>Menu</li>
					</AnchorLink>
					<AnchorLink href="#mobile" className="anchorlink">
						<li>Mobile-apps</li>
					</AnchorLink>
					<AnchorLink href="#contact" className="anchorlink">
						<li>Contact us</li>
					</AnchorLink>
				</ul>
			</div>

	
			<div className="hidden md:flex gap-4">
				<Link to={"/cart"}>
					<div className="flex relative">
						<img className="h-6 relative" src="basket_icon.png" alt="cart" />
						{getTotalCartAmount() > 0 && (
							<span className="text-red-600 text-2xl absolute left-4 bottom-2">•</span>
						)}
					</div>
				</Link>

				{!token ? (
					<button
						onClick={() => setshowLogin(true)}
						className="border border-blue-800 text-xs md:text-sm rounded-full px-4 py-1"
					>
						Register
					</button>
				) : (
					<div className="relative profile-menu">
						<img
							className="h-6 cursor-pointer"
							src="profile_icon.png"
							alt="dp"
							onClick={() => setShowProfileMenu(!showProfileMenu)}
						/>
						{showProfileMenu && (
							<div className="absolute z-40 right-0 mt-2 w-32 flex flex-col border-gray-400 border-2 py-1 px-4 rounded-md bg-orange-50 shadow-lg">
								<div className="flex gap-1 cursor-pointer">
									<img className="h-6" src="bag_icon.png" alt="bag" />
									<p onClick={() => navigate("/myorders")} className="text-sm hover:text-orange-600">
										Orders
									</p>
								</div>
								<hr />
								<div className="flex gap-1 cursor-pointer" onClick={logOut}>
									<img className="h-6" src="logout_icon.png" alt="logout" />
									<p className="text-sm hover:text-orange-600">Logout</p>
								</div>
							</div>
						)}
					</div>
				)}
			</div>

	
			<button className="md:hidden flex flex-col gap-1" onClick={() => setIsOpen(!isOpen)}>
				<img src="hamburger.svg" alt="menu" className="h-6 w-6" />
			</button>

	
			{isOpen && (
				<div className="absolute top-16 right-0 w-48 bg-white shadow-md rounded-lg md:hidden flex flex-col items-center py-4 font-semibold z-40 border border-gray-200">
					<ul className="flex flex-col items-center gap-3 ">
						<AnchorLink href="#home" className="anchorlink">
							<li>Home</li>
						</AnchorLink>
						<AnchorLink href="#menu" className="anchorlink">
							<li>Menu</li>
						</AnchorLink>
						<AnchorLink href="#mobile" className="anchorlink">
							<li>Mobile-apps</li>
						</AnchorLink>
						<AnchorLink href="#contact" className="anchorlink">
							<li>Contact us</li>
						</AnchorLink>
					</ul>

			
					<div className="flex gap-3 mt-4">
						<Link to={"/cart"}>
							<img className="h-5 cursor-pointer" src="basket_icon.png" alt="cart" />
						</Link>
						{!token ? (
							<button
								onClick={() => setshowLogin(true)}
								className="border border-blue-800 text-xs rounded-full px-4 py-1"
							>
								Register
							</button>
						) : (
							<div className="relative profile-menu">
								<img
									className="h-5 cursor-pointer"
									src="profile_icon.png"
									alt="dp"
									onClick={() => setShowProfileMenu(!showProfileMenu)}
								/>
								{showProfileMenu && (
									<div className="absolute z-40 right-0 mt-2 w-32 flex flex-col border-gray-400 border-2 py-1 px-4 rounded-md bg-orange-50 shadow-lg">
										<div className="flex gap-1 cursor-pointer">
											<img className="h-6" src="bag_icon.png" alt="bag" />
											<p onClick={() => navigate("/myorders")} className="text-sm hover:text-orange-600">
												Orders
											</p>
										</div>
										<hr />
										<div className="flex gap-1 cursor-pointer" onClick={logOut}>
											<img className="h-6" src="logout_icon.png" alt="logout" />
											<p className="text-sm hover:text-orange-600">Logout</p>
										</div>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Nav;
