import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Themtruyen = ({ onUpdate }) => {
  const [listtruyen, setListTruyen] = useState([]);

  useEffect(() => {
    axios
      .get("/api/truyen")
      .then((res) => {
        setListTruyen(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAddTruyen = (event) => {
    event.preventDefault();
    const form = event.target;
    const newTruyen = {
      ten_truyen: form.ten_truyen.value,
      truyen: form.truyen.value,
      tac_gia: form.tac_gia.value,
      the_loai: form.the_loai.value,
      gioi_thieu: form.gioi_thieu.value,
      trang_thai: form.trang_thai.value,
      Nguon: form.Nguon.value,
      avatar: form.avatar.value,
      gia: form.gia.value,
    };
    if (Object.values(newTruyen).some((val) => val === "")) {
      toast.error("Vui lòng điền đầy đủ thông tin truyện");
      return;
    }
    axios
      .post("/api/truyen", newTruyen)
      .then((res) => {
        setListTruyen([...listtruyen, res.data]);
        form.reset();
        onUpdate(); // call onUpdate function passed as props
        toast.success("them truyen thanh cong");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleDeleteTruyen(id) {
    axios.delete(`/api/truyen/${id}`).then((response) => {
      // xóa truyện khỏi danh sách trên giao diện
      const updatedListTruyen = listtruyen.filter((truyen) => truyen.id !== id);
      setListTruyen(updatedListTruyen);
      onUpdate(); // call onUpdate function passed as props
      toast.success("xoa truyen thanh cong");
    });
  }
  return (
    <div>
      <form onSubmit={handleAddTruyen}>
        <input type="text" name="ten_truyen" placeholder="Tên truyện" />
        <input type="text" name="truyen" placeholder="Tên file truyện" />
        <input type="text" name="tac_gia" placeholder="Tác giả" />
        <input type="text" name="the_loai" placeholder="Thể loại" />
        <input type="text" name="gioi_thieu" placeholder="Giới thiệu" />
        <input type="text" name="trang_thai" placeholder="Trạng thái" />
        <input type="text" name="Nguon" placeholder="Nguồn" />
        <input type="text" name="avatar" placeholder="Link ảnh bìa" />
        <input type="text" name="gia" placeholder="Giá" />
        <button type="submit">Thêm truyện</button>
      </form>
      <ul>
        {listtruyen.map((truyen) => (
          <li key={truyen.id}>
            <h3>{truyen.ten_truyen}</h3>
            <p>{truyen.gioi_thieu}</p>
            <button onClick={() => handleDeleteTruyen(truyen.id)}>
              Xóa truyện
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Themtruyen;

//
