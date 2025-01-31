import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [page, setpage] = useState("");

  return (
    <div className=" w-20 sm:w-36 min-h-screen border-r relative  border-gray-400 flex flex-col gap-14 pt-10  bg-white overflow-y-auto ">
      <Link to={"/"}>
        <div
          onClick={() => setpage("add")}
          className={`flex items-center w-fit gap-2 p-1 absolute right-0 px-1.5  border border-r-0 border-gray-400  ${
            page === "add" ? "bg-orange-50" : ""
          }`}
        >
          <img className="h-6" src="add_icon.png" alt="add" />
          <p className="text-sm font-semibold hidden sm:block">Add Items</p>
        </div>
      </Link>
      <Link to={"/list"}>
        <div
          onClick={() => setpage("list")}
          className={`flex items-center w-fit gap-2 p-1 absolute right-0 px-2 border-r-0  border border-gray-400   ${
            page === "list" ? "bg-orange-50" : ""
          }`}
        >
          <img className="h-6" src="order_icon.png" alt="list" />
          <p className="text-sm font-semibold hidden sm:block">List Items</p>
        </div>
      </Link>
      <Link to={"/order"}>
        <div
          onClick={() => setpage("order")}
          className={`flex items-center w-fit gap-2 p-1 absolute right-0 px-2 border-r-0  border border-gray-400  ${
            page === "order" ? "bg-orange-50" : ""
          }`}
        >
          <img className="h-6" src="order_icon.png" alt="order" />
          <p className="text-sm font-semibold hidden sm:block">List Order</p>
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
