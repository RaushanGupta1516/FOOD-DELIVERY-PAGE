const Footer = () => {
	return (
		<div
			id="contact"
			className="bg-zinc-800 text-white flex flex-col py-10 gap-5 justify-center items-center"
		>
			<div className="flex flex-col md:flex-row justify-around w-full px-6 md:px-16">
				<div className="flex flex-col w-full md:w-1/3 gap-4 text-center md:text-left">
					<h1 className="text-4xl text-orange-700 font-bold">Eatzy</h1>
					<p className="text-sm">
						Your satisfaction is our priority! We strive to bring you fresh,
						tasty, and hassle-free food delivery whenever you need it. Enjoy
						every bite with convenience at your fingertips. Order now and let
						the feast begin!
					</p>
					<div className="flex justify-center md:justify-start gap-3">
						<img className="h-8" src="facebook_icon.png" alt="fb" />
						<img className="h-8" src="twitter_icon.png" alt="twt" />
						<img className="h-8" src="linkedin_icon.png" alt="lnkd" />
					</div>
				</div>

				<div className="flex flex-col mt-6 md:mt-0 text-center md:text-left">
					<h1 className="text-xl font-bold mb-5">COMPANY</h1>
					<p className="text-sm text-gray-300 font-semibold mb-1">Home</p>
					<p className="text-sm text-gray-300 font-semibold mb-1">About Us</p>
					<p className="text-sm text-gray-300 font-semibold mb-1">Delivery</p>
					<p className="text-sm text-gray-300 font-semibold mb-1">
						Privacy Policy
					</p>
				</div>

				<div className="flex flex-col mt-6 md:mt-0 text-center md:text-left">
					<h1 className="text-xl font-bold mb-5">GET IN TOUCH</h1>
					<p className="text-sm text-gray-300 font-semibold mb-1">
						+123-456-789
					</p>
					<p className="text-sm text-gray-300 font-semibold mb-1">
						contact@eatzy.com
					</p>
				</div>
			</div>

			<div className="h-[2px] w-full md:w-10/12 bg-gray-500 mt-6"></div>

			<p className="text-center">
				Copyright 2025 @Eatzy.com. All Rights Reserved.
			</p>
		</div>
	);
};

export default Footer;
