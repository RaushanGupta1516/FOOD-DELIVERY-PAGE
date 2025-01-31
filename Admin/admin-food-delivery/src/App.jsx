import Add from "./Add";

import List from "./List";
import Nav from "./Nav";
import Order from "./Order";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
const App = () => {
	const url = "http://localhost:4000";
	return (
		<div className="overflow-x-hidden">
			<ToastContainer />
			<Nav />
			<div className="flex">
				<Sidebar />
				<Routes>
					<Route path="/" element={<Add url={url} />} />
					<Route path="/list" element={<List url={url} />} />
					<Route path="/order" element={<Order url={url} />} />
				</Routes>
			</div>
		</div>
	);
};
export default App;
