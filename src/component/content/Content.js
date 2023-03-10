import { Link } from "react-router-dom";
import "./Content.css";
import { CartContext } from "../../context/CartContext";
import { useContext, useState } from "react";
import Filter from "../filter/Filter";
const Content = () => {
  const { datas } = useContext(CartContext);
  const [filteredAuthor, setFilteredAuthor] = useState("");
  const [filteredCategory, setFilteredCategory] = useState("");

  const filteredProducts = datas.filter((product) => {
    const matchesAuthor =
      filteredAuthor === "" ||
      product.tac_gia.toLowerCase().includes(filteredAuthor.toLowerCase());
    const matchesCategory =
      filteredCategory === "" ||
      product.the_loai.toLowerCase().includes(filteredCategory.toLowerCase());

    return matchesAuthor && matchesCategory;
  });

  return (
    <div className="content">
      <Filter
        filteredAuthor={filteredAuthor}
        setFilteredAuthor={setFilteredAuthor}
        filteredCategory={filteredCategory}
        setFilteredCategory={setFilteredCategory}
      />
      <div className="content-main">
        <div className="main-item">
          {filteredProducts.length === 0 && (
            <p>Không tìm thấy sản phẩm phù hợp</p>
          )}
          {filteredProducts.length > 0 &&
            filteredProducts.map((item) => {
              return (
                <Link to={`/truyens/${item.id}`} key={item.id}>
                  <div className="item">
                    <div className="item-img">
                      <img src={item.avatar} alt={item.ten_truyen} />
                    </div>
                    <div className="item-content">
                      <h3>{item.ten_truyen}</h3>
                      <p className="content-p">{item.gioi_thieu}</p>
                      <div className="content-tg">
                        <span>
                          <i className="fa-solid fa-user-pen" />
                          <span>{item.tac_gia}</span>
                        </span>
                        <a href=" #">{item.the_loai}</a>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Content;
