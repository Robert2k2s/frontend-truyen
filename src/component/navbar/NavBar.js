import { useContext, useEffect, useState } from "react";
import "./NavBar.css";
import { CartContext } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();
  const { cart, addToCart } = useContext(CartContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.quantity;
    });
    setCartCount(count);
  }, [cart]);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    addToCart([]);
    navigate("/login");
  };

  return (
    <>
      {isLoggedIn && (
        <nav className="navbar">
          <div className="logo">
            <img
              src="https://vtruyen.com/assets/images/logo.png?80624"
              alt=""
            />
          </div>
          <div className="link">
            <Link to="/">Trang Chủ</Link>
            <Link to="/carts">
              Giỏ hàng
              {cartCount > 0 && <span>{cartCount}</span>}
            </Link>
            <Link to="/paypal">Thanh Toán</Link>{" "}
            <Link to="/themtruyen">Thêm truyện</Link>
          </div>
          <div className="logout">
            <button onClick={handleLogout}>Logout</button>
          </div>
        </nav>
      )}
    </>
  );
};

export default NavBar;
