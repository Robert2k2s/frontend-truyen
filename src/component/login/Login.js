// Import các thư viện và components cần thiết
import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import "./Login.css";
import { toast } from "react-toastify";
import { app } from "../firebase/Firebase";
// Component Login
const Login = ({ setIsLoggedIn }) => {
  // State của các trường nhập liệu và thông tin đăng nhập bằng Google
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [namegoogle, setNameGoogle] = useState("");
  const [nameemail, setNameEmail] = useState("");
  const [nameavatar, setNameAvatar] = useState("");
  // Sử dụng Firebase để xác thực đăng nhập bằng Google
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // Kiểm tra xem user đã đăng nhập hay chưa bằng cách kiểm tra xem thông tin đăng nhập đã được lưu trong localStorage chưa
  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    const namegoogle = localStorage.getItem("namegoogle");
    const emailgoogle = localStorage.getItem("emailgoogle");
    const avatargoogle = localStorage.getItem("avatargoogle");

    if (storedUsername && storedPassword) {
      setUsername(storedUsername);
      setPassword(storedPassword);
      setIsLoggedIn(true);
      navigate("/");
    }

    if (namegoogle && emailgoogle && avatargoogle) {
      setNameGoogle(namegoogle);
      setNameEmail(emailgoogle);
      setNameAvatar(avatargoogle);
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [setIsLoggedIn, navigate]);

  // Hàm đăng nhập bằng tài khoản Google
  const signInWidthGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        if (result) {
          setIsLoggedIn(true);
          toast.success("dang nhap thanh cong!");
          navigate("/");
          const namegoogle = result.user.displayName;
          const emailgoogle = result.user.email;
          const avatargoogle = result.user.photoURL;
          setNameGoogle(namegoogle);
          setNameEmail(emailgoogle);
          setNameAvatar(avatargoogle);
          localStorage.setItem("namegoogle", namegoogle);
          localStorage.setItem("emailgoogle", emailgoogle);
          localStorage.setItem("avatargoogle", avatargoogle);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        alert(error);
      });
  };
  // Hàm xử lý submit form đăng nhập
  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        const response = await axios.post("/api/login", {
          username,
          password,
        });
        if (response.data.success) {
          setIsLoggedIn(true);
          toast.success("Đăng nhập thành công! Xin chào");
          navigate("/");
          localStorage.setItem("username", username);
          localStorage.setItem("password", password);
        } else {
          toast.error(
            "Đăng nhập thất bại! Hãy kiểm tra mật khẩu hoặc tài khoản của bạn!"
          );
        }
      } catch (error) {
        console.log("Something went wrong");
      }
    },
    [username, password, setIsLoggedIn, navigate]
  );

  // Hàm xử lý reset form đăng nhập
  const handleReset = useCallback(() => {
    setUsername("");
    setPassword("");
  }, []);

  return (
    <div className="form">
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="container">
          <input
            type="text"
            placeholder="Enter Username"
            name="uname"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="password"
            placeholder="Enter Password"
            name="psw"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <button type="submit">Get Login</button>
        </div>
        <div className="container">
          <button type="reset" className="cancelbtn">
            Reset
          </button>
          <span className="register">
            <Link to="/register">Register</Link>
          </span>
        </div>
      </form>
      <button className="googleLogin" onClick={signInWidthGoogle}>
        Đăng Nhập bằng Google
      </button>
    </div>
  );
};

export default Login;
