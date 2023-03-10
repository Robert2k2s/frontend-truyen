import { useContext } from "react";
import { useParams } from "react-router-dom";
import Banner from "../banner/Banner";
import { toast } from "react-toastify";

import "./ListTruyen.css";
import { CartContext } from "../../context/CartContext";

const ListTruyen = ({ isLoggedIn }) => {
  const { cart, addToCart, datas } = useContext(CartContext);
  const { id } = useParams();
  const truyen = datas.find((item) => item.id === parseInt(id));

  const handleAddToCart = (product) => {
    toast.success("đã mua thành công");
    const index = cart.findIndex((item) => item.id === product.id);
    if (index === -1) {
      addToCart([...cart, { ...product, quantity: 1 }]);
    } else {
      const newCart = [...cart];
      newCart[index].quantity += 1;

      addToCart(newCart);
    }
  };

  return (
    <div className="listTruyen">
      <Banner />
      <div className="listTruyen-item">
        <div className="listTruyen-item-top">
          <div className="listTruyen-item-top__img">
            <img src={truyen.avatar} alt="" />
          </div>
          <div className="listTruyen-item-top__content">
            <div className="content-name">
              <h1>{truyen.ten_truyen}</h1>
            </div>
            <div className="content-author">
              <a href=" #">{truyen.tac_gia}</a>
              <a href=" #">{truyen.the_loai}</a>
            </div>
            <div className="content-btn">
              <button>
                <i className="fa-solid fa-glasses"></i>
                <span>Đọc Truyện</span>
              </button>
              <button>
                <i className="fa-solid fa-bookmark"></i> <span>Đánh Dấu</span>
              </button>
              <button>
                <i className="fa-solid fa-fan"></i>
                <span>Đề Cử</span>
              </button>
            </div>
            <div className="content-addCart">
              <button type="button" onClick={() => handleAddToCart(truyen)}>
                Add To Cart
              </button>
              <button>{truyen.gia}</button>
              <span>
                SL:{cart.find((item) => item.id === truyen.id)?.quantity ?? 0}
              </span>
            </div>
          </div>
        </div>
        {/* bottom */}
        <div className="listTruyen-item-bottom">
          <h3>Giới Thiệu</h3>
          <p>{truyen.gioi_thieu}</p>
        </div>
      </div>
    </div>
  );
};

export default ListTruyen;
