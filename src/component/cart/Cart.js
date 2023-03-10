import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./Cart.css";
import { toast } from "react-toastify";

const Cart = () => {
  const { cart, addToCart } = useContext(CartContext);

  // xử lý xóa sản phẩm khỏi giỏ hàng
  const handleRemoveFromCart = (product) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    toast.success("Đã xóa sản phẩm thành công");
    addToCart(newCart);
  };

  // xử lý tăng số lượng sản phẩm trong giỏ hàng
  const handleIncrement = (product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === product.id);
    newCart[index].quantity += 1;
    addToCart(newCart);
  };

  // xử lý giảm số lượng sản phẩm trong giỏ hàng
  const handleDecrement = (product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.id === product.id);
    if (newCart[index].quantity > 1) {
      newCart[index].quantity -= 1;
      addToCart(newCart);
    }
  };

  // xử lý clear giỏ hàng
  const handleClearCart = () => {
    toast.success("Đã clear sản phẩm thành công");
    addToCart([]);
  };

  // tính tổng giá trị của giỏ hàng
  const getTotalPrice = () => {
    return cart.reduce(
      (acc, curr) => acc + parseInt(curr.gia) * parseInt(curr.quantity),
      0
    );
  };

  return (
    <div className="cart">
      {cart.map((item) => {
        return (
          <div>
            <h1>{item.name}</h1>
          </div>
        );
      })}
      <div className="cart-items">
        {/* thông báo giỏ hàng trống  */}
        {cart.length === 0 ? (
          <p>Your cart is currently empty.</p>
        ) : (
          cart.map((product) => (
            <div key={product.id} className="cart-item">
              <div className="cart-item-image">
                <img src={product.avatar} alt={product.ten_truyen} />
              </div>
              <div className="cart-item-info">
                <h4>{product.ten_truyen}</h4>
                <p>Price: {product.gia} VND</p>
                <p>Quantity: {product.quantity}</p>
                <div className="cart-item-buttons">
                  {/* // xử lý giảm số lượng sản phẩm */}
                  <button onClick={() => handleDecrement(product)}>-</button>
                  {/* // xử lý tăng số lượng sản phẩm */}
                  <button onClick={() => handleIncrement(product)}>+</button>
                  {/* // xử lý xóa sản phẩm */}
                  <button onClick={() => handleRemoveFromCart(product)}>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {cart.length > 0 && (
        <div className="cart-summary">
          <p>Total Price: {getTotalPrice()}.000.000 VND</p>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      )}
    </div>
  );
};

export default Cart;

//

// import { useContext, useReducer, useState } from "react";
// import { CartContext } from "../../context/CartContext";
// import "./Cart.css";
// import {
//   cartReducer,
//   addToCart,
//   removeFromCart,
//   incrementQuantity,
//   decrementQuantity,
//   clearCart,
// } from "../../reducer/Reducer";

// const Cart = () => {
//   const { cart } = useContext(CartContext);
//   const [state, dispatch] = useReducer(cartReducer, cart);

//   const handleRemoveFromCart = (product) => {
//     removeFromCart(dispatch)(product);
//   };

//   const handleIncrement = (product) => {
//     incrementQuantity(dispatch)(product);
//   };

//   const handleDecrement = (product) => {
//     decrementQuantity(dispatch)(product);
//   };

//   const handleClearCart = () => {
//     clearCart(dispatch)();
//   };

//   const getTotalPrice = () => {
//     return state.reduce(
//       (acc, curr) => acc + parseInt(curr.gia) * parseInt(curr.quantity),
//       0
//     );
//   };
//   return (
//     <div className="cart">
//       {state.map((item) => {
//         return (
//           <div>
//             <h1>{item.name}</h1>
//           </div>
//         );
//       })}
//       <div className="cart-items">
//         {state.length === 0 ? (
//           <p>Your cart is currently empty.</p>
//         ) : (
//           state.map((product) => (
//             <div key={product.id} className="cart-item">
//               <div className="cart-item-image">
//                 <img src={product.avatar} alt={product.ten_truyen} />
//               </div>
//               <div className="cart-item-info">
//                 <h4>{product.ten_truyen}</h4>
//                 <p>Price: {product.gia} VND</p>
//                 <p>Quantity: {product.quantity}</p>
//                 <div className="cart-item-buttons">
//                   <button onClick={() => handleDecrement(product)}>-</button>
//                   <button onClick={() => handleIncrement(product)}>+</button>
//                   <button onClick={() => handleRemoveFromCart(product)}>
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//       {state.length > 0 && (
//         <div className="cart-summary">
//           <p>Total Price: {getTotalPrice()}.000.000 VND</p>
//           <button onClick={handleClearCart}>Clear Cart</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
