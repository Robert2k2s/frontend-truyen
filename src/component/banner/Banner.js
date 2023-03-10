// Import các thư viện cần thiết
import { useRef, useCallback, useState, useEffect } from "react";
import "./Banner.css";

// Thiết lập tốc độ hiển thị ảnh là 3000ms
const speed = 3000;

const Banner = () => {
  // Danh sách ảnh
  const images = [
    "https://static.cdnno.com/storage/topbox/6478d6c1f62762d2e4256f0e798ef48e.jpg",
    "https://static.cdnno.com/storage/topbox/3032c144338cfe8519efae2b63a390b2.jpg",
    "https://static.cdnno.com/storage/topbox/fcf19dd6559de0f56db0bf0a786e598a.jpg",
    "https://static.cdnno.com/storage/topbox/8a94aca6f2819ece1ed54569c3143e2f.jpg",
    "https://static.cdnno.com/storage/topbox/bfcc3cc0dd158b47dae5f32ba08c31e0.jpg",
  ];

  // Khai báo biến tham chiếu để truy cập các phần tử DOM
  const listRef = useRef(null);
  const intervalRef = useRef(null);

  // Sử dụng state hook để lưu trạng thái dừng tự động chuyển ảnh
  const [isAutoPaused, setIsAutoPaused] = useState(false);

  // Hàm xử lý sự kiện khi nhấn nút "Prev"
  const handlePrevClick = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsAutoPaused(true);
    listRef.current.prepend(listRef.current.lastChild);
    setTimeout(() => {
      setIsAutoPaused(false);
    }, speed);
  }, []);

  // Hàm xử lý sự kiện khi nhấn nút "Next"
  const handleNextClick = useCallback(() => {
    clearInterval(intervalRef.current);
    setIsAutoPaused(true);
    listRef.current.appendChild(listRef.current.firstChild);
    setTimeout(() => {
      setIsAutoPaused(false);
    }, speed);
  }, []);

  // Sử dụng useEffect để tự động chuyển ảnh sau 3s
  useEffect(() => {
    let intervalId = null;
    if (!isAutoPaused) {
      intervalId = setInterval(() => {
        listRef.current.appendChild(listRef.current.firstChild);
      }, speed);
      intervalRef.current = intervalId;
    }

    return () => clearInterval(intervalId);
  }, [isAutoPaused]);

  // Sử dụng useEffect để dừng tự động chuyển ảnh khi người dùng click vào slideshow
  useEffect(() => {
    let timeoutId = null;
    const handleAutoResume = () => {
      setIsAutoPaused(false);
      clearInterval(intervalRef.current);
      timeoutId = setTimeout(() => {
        setIsAutoPaused(true);
      }, speed);
    };

    const listRefCurrent = listRef.current;
    listRefCurrent.addEventListener("click", handleAutoResume);
    return () => {
      listRefCurrent.removeEventListener("click", handleAutoResume);
      clearTimeout(timeoutId);
    };
  }, [listRef]);

  // Render phần slideshow với các nút điều khiển và danh sách ảnh
  return (
    <div className="slideshow">
      <button className="prev" onClick={handlePrevClick}>
        <i class="fa-solid fa-chevron-left"></i>
      </button>
      <button className="next" onClick={handleNextClick}>
        <i class="fa-solid fa-chevron-right"></i>
      </button>
      <div className="list-item" ref={listRef}>
        {images.map((item, index) => (
          <img key={index} className="side" src={item} alt={item} />
        ))}
      </div>
    </div>
  );
};

export default Banner;
