const Nav = () => {
	return (
		<div className="flex w-screen flex-row justify-between items-center border border-b px-4 md:px-20 py-3 gap-4 md:gap-0">
			
			<div className="flex flex-col">
			<div className="flex items-center gap-3 md:gap-5">
				<img className="h-10 md:h-auto" src="icon.svg" alt="logo" />
				<h1 className="text-2xl md:text-3xl text-orange-700 font-bold">Eatzy</h1>
			</div>
			<h2 className="text-md md:text-lg font-semibold">Admin Panel</h2>
			</div>
			<img className="rounded-full h-12 md:h-14" src="profile_image.png" alt="pp" />
		</div>
	);
};
export default Nav;
