import "./Filter.css";

const Filter = ({
  filteredAuthor, // biến state cho filteredAuthor
  setFilteredAuthor, // hàm setter cho filteredAuthor
  filteredCategory, // biến state cho filteredCategory
  setFilteredCategory, // hàm setter cho filteredCategory
}) => {
  // hàm xử lý khi thay đổi giá trị của input tác giả
  const handleAuthorChange = (event) => {
    setFilteredAuthor(event.target.value); // cập nhật giá trị của filteredAuthor bằng giá trị mới được nhập vào
  };
  // hàm xử lý khi thay đổi giá trị của input thể loại
  const handleCategoryChange = (event) => {
    setFilteredCategory(event.target.value); // cập nhật giá trị của filteredCategory bằng giá trị mới được nhập vào
  };

  return (
    <div className="filter">
      <label htmlFor="author">Tác Giả:</label>
      <input
        type="text"
        id="author"
        name="author"
        value={filteredAuthor}
        onChange={handleAuthorChange}
      />

      <label htmlFor="category">Thể Loại:</label>
      <input
        type="text"
        id="category"
        name="category"
        value={filteredCategory}
        onChange={handleCategoryChange}
      />
    </div>
  );
};
export default Filter;
