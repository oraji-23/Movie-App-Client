import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://movie-app-server-147.onrender.com",
});

export default axiosInstance;
