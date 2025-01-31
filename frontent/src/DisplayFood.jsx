import { useContext } from "react";
import { StoreContext } from "./StoreContext";
import FoodItem from "./FoodItem";

const DisplayFood = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="mx-6 md:ml-32 md:mr-28 mt-10 mb-28">
    
      <h1 className="text-3xl font-semibold mb-6">Top Dishes near you</h1>

  
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-20 lg:grid-cols-3  lg:gap-x-32 xl:grid-cols-4 xl:gap-x-28   ">
        {food_list.map((item, index) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            );
          }
        })}
      </div>


      <div id="mobile" className="flex flex-col items-center mt-24 gap-10">
        <h1 className="text-2xl md:text-4xl font-semibold w-full md:w-2/3 text-center">
          For Better Experience Download <br />
          Eatzy App
        </h1>
        <div className="flex flex-col md:flex-row gap-4">
          <img
            className="h-14 hover:cursor-pointer hover:scale-105 transition-all"
            src="play_store.png"
            alt="Play Store"
          />
          <img
            className="h-14 hover:cursor-pointer hover:scale-105 transition-all"
            src="app_store.png"
            alt="App Store"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayFood
