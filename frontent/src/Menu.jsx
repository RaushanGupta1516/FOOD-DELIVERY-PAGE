import { menu_list } from "../public/assets";
import "./styles/scrollbar.css"; 

const Menu = ({ category, setcategory }) => {
  return (
    <div id="menu" className="flex flex-col mx-4 sm:mx-6 md:ml-32 md:mr-28 gap-3">
      
      <h1 className="font-semibold text-2xl sm:text-3xl mt-8 text-center md:text-left">
        Explore our Menu
      </h1>

      
      <p className="w-full md:w-3/5 text-gray-700 font-medium text-sm sm:text-base text-center md:text-left">
        Discover a world of flavors with our diverse menu—whether you're craving something spicy, sweet, or savory, we have the perfect dish waiting for you.
      </p>

      <div className="mt-6 overflow-x-auto custom-scrollbar">
        <div className="flex gap-6 md:gap-8 lg:gap-10 items-center w-max px-4">
          {menu_list.map((item, index) => (
            <div
              key={index}
              onClick={() => setcategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
              className="flex flex-col gap-2 items-center justify-center cursor-pointer min-w-[100px] sm:min-w-[120px] md:min-w-[140px]"
            >
              <img
                className={`w-20 sm:w-24 md:w-28 lg:w-32 h-auto ${
                  category === item.menu_name ? "p-1 border-orange-700 border-4 rounded-full" : ""
                }`}
                src={item.menu_image}
                alt="menupic"
              />
              <p className="text-gray-600 font-semibold text-xs sm:text-sm md:text-base text-center">
                {item.menu_name}
              </p>
            </div>
          ))}
        </div>
      </div>


      <div className="mt-10 h-[1px] w-full bg-gray-300"></div>
    </div>
  );
};

export default Menu;
