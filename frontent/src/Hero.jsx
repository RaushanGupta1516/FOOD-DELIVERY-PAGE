import AnchorLink from "react-anchor-link-smooth-scroll";
const Hero = () => {
	return (
		<div className="relative mx-4 sm:mx-6 md:ml-32 md:mr-28 ">
			
			<img src="hero.png" alt="hero" className="w-full h-auto object-cover" />

	
			<div className="absolute top-0 x4:top-4 x5:top-8  sm:top-6 lg:top-20 left-1/2 transform -translate-x-1/2    w-11/12  flex flex-col justify-center  sm:gap-4 x4:gap-1  text-white text-center ">
				<h1 className="font-bold text-xl x4:text-2xl sm:text-4xl md:text-5xl lg:text-6xl leading-snug sm:leading-tight">
					Order your <br /> favourite food here!
				</h1>
				<p className="text-xs x5:text-xl sm:text-lg md:text-base lg:text-xl">
					Hungry? Let us bring your favorite food to you! Browse top restaurants
					and discover delicious meals.
				</p>
				<AnchorLink href="#menu" className="anchorlink w-full flex justify-center">
					<button className="hidden x4:block text-gray-500 bg-white px-5 py-2 text-sm w-fit rounded-full ">
						View Menu
					</button>
				</AnchorLink>
			</div>
		</div>
	);
};

export default Hero;
