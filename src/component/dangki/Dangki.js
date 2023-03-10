import { useState } from "react"; // Nhập hook useState từ React
import axios from "axios"; // Nhập thư viện axios để thực hiện các yêu cầu HTTP
import { useNavigate } from "react-router-dom"; // Nhập hook useNavigate từ react-router-dom để điều hướng giữa các route
import { toast } from "react-toastify"; // Nhập thư viện toast để hiển thị thông báo
import "./Dangki.css"; // Nhập stylesheet cho component này
function RegisterForm() {
  // Định nghĩa một functional component có tên RegisterForm
  const [username, setUsername] = useState(""); // Khai báo một state variable cho username và setter function của nó
  const [password, setPassword] = useState(""); // Khai báo một state variable cho password và setter function của nó
  const navigate = useNavigate(); // Khai báo một biến navigate sử dụng hook useNavigate
  const handleSubmit = async (e) => {
    // Định nghĩa một asynchronous function có tên handleSubmit nhận vào một object event làm tham số
    e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form
    if (username === "" || password === "") {
      // Kiểm tra nếu username hoặc password trống
      toast.error("Vui lòng nhập tên đăng nhập và mật khẩu!"); // Hiển thị thông báo lỗi sử dụng thư viện toast
      return; // Thoát khỏi function
    }
    try {
      const response = await axios.post("/api/register", {
        // Thực hiện một POST request đến endpoint /api/register sử dụng thư viện axios
        username, // Gửi biến username làm trường "username" trong request body
        password, // Gửi biến password làm trường "password" trong request body
      });

      navigate("/login"); // Điều hướng đến route /login sử dụng biến navigate
      // Thêm thông báo khi đăng kí thành công
      toast.success(`Đăng kí tài khoản thành công! Xin chào ${username}`);
    } catch (error) {
      toast.error("Đăng kí tài khoản thất bại");
    }
  };

  return (
    <form className="formLogOut" onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">Register</button>
    </form>
  );
}

export default RegisterForm;
