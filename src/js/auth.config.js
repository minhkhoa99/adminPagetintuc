import axios from "axios";
import Cookies from "js-cookie";

// Hàm để lấy token từ cookie
const getTokenFromCookie = () => {
  const setCokkies = Cookies.get("Authorization", { expires: 1 }); // Thay 'your_token_cookie_name' bằng tên của cookie chứa token

  return setCokkies;
};

const removeToken = () => {
  Cookies.remove("Authorization", getTokenFromCookie());
};

// Tạo một instance Axios với cấu hình mặc định
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getTokenFromCookie()}`, // Nếu bạn cần thêm token vào header
  },
});

export { removeToken, axiosInstance };
