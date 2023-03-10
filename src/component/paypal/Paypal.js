import "./Paypal.css";
import { useState, useContext } from "react";
import { CartContext } from "../../context/CartContext";

const Paypal = () => {
  const [active, setActive] = useState(0);
  const { cart } = useContext(CartContext);
  const handleItemClick = (index) => {
    setActive(index);
  };

  return (
    <div className="paypal">
      <div className="paypal-title">
        <p>Phương thức thanh toán</p>
      </div>
      <div className="paypal-method">
        <div className="paypal-item">
          <ul>
            <li
              className={active === 0 ? "active" : ""}
              onClick={() => handleItemClick(0)}
            >
              Ví Momo
            </li>
            <li
              className={active === 1 ? "active" : ""}
              onClick={() => handleItemClick(1)}
            >
              Ngân Hàng
            </li>
            <li
              className={active === 2 ? "active" : ""}
              onClick={() => handleItemClick(2)}
            >
              Paypal
            </li>
            <li
              className={active === 3 ? "active" : ""}
              onClick={() => handleItemClick(3)}
            >
              Cart Điện Thoại
            </li>
          </ul>
        </div>
      </div>
      <div className="paypal-main">
        <h2>Số tiền phải thanh toán:</h2>
        {cart.length > 0 && (
          <p>
            {cart.reduce(
              (acc, curr) => acc + parseInt(curr.gia) * parseInt(curr.quantity),
              0
            )}
            .000.000 VND
          </p>
        )}
      </div>
    </div>
  );
};

export default Paypal;
