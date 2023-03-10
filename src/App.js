import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Home from "./component/home/Home";
import ListTruyen from "./component/listtruyen/ListTruyen";
import Cart from "./component/cart/Cart";
import NavBar from "./component/navbar/NavBar";
import Login from "./component/login/Login";
import RegisterForm from "./component/dangki/Dangki";
import { CartContext } from "./context/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Paypal from "./component/paypal/Paypal";
import Themtruyen from "./component/themtruyen/Themtruyen";

function App() {
  const [datas, setData] = useState([]);
  const [cart, addToCart] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [update, setUpdate] = useState(false); // update state

  useEffect(() => {
    function getData() {
      const res = axios.get("/api/truyen");
      return res;
    }
    getData()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [update]);
  const handleUpdate = () => {
    setUpdate(!update);
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, datas }}>
      <Router>
        <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="app">
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
              />
              {/* Kiểm tra nếu isLoggedIn = true thì chuyển đến trang Home, nếu isLoggedIn = false thì chuyển đến trang Login */}
              <Route
                path="/truyens/:id"
                element={<ListTruyen isLoggedIn={isLoggedIn} />}
              />
              <Route path="/carts" element={<Cart />} />
              <Route path="/paypal" element={<Paypal />} />
              <Route
                path="/themtruyen"
                element={<Themtruyen onUpdate={handleUpdate} />}
              />
              <Route
                path="/login"
                element={<Login setIsLoggedIn={setIsLoggedIn} />}
              />
              {/* Truyền props setIsLoggedIn xuống component Login để cập nhật giá trị isLoggedIn */}
              <Route path="/register" element={<RegisterForm />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      ></ToastContainer>
    </CartContext.Provider>
  );
}

export default App;
