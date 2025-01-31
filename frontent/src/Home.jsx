import { useState } from "react";
import Hero from "./Hero";
import Menu from "./Menu";
import DisplayFood from "./DisplayFood";

const Home = () => {
	const [category, setcategory] = useState("All");
	return (
		<div id="home">
			<Hero />
			<Menu category={category} setcategory={setcategory} />
			<DisplayFood category={category} />
		</div>
	);
};

export default Home;
