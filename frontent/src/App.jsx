import {Routes,Route}  from "react-router-dom"

import Nav from "./Nav"
import Home from "./Home"
import Cart from "./Cart"
import PlaceOrder from "./PlaceOrder"
import Footer from "./Footer"
import { useState } from "react"
import Login from "./Login"
import Verify from "./Verify"
import { ToastContainer } from 'react-toastify';
import Myorders from "./Myorders"

const App = () => {
  const [showLogin, setshowLogin] = useState(false);
  return (
    <>
      <ToastContainer/>
      {showLogin?<Login setshowLogin={setshowLogin} />:<></>}
    <div className="min-h-screen flex flex-col">
      <Nav setshowLogin={setshowLogin} />
      <Routes>
        <Route path="/" element={ <Home/>} />
        <Route path="/cart" element={ <Cart/>} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/verify" element={<Verify/>}></Route>
          <Route path="/myorders" element={<Myorders/>}></Route>
      </Routes>
        <Footer />
  
      </div>
      </>
  )
}
export default App