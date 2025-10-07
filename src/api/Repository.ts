import { AxiosInstance } from "axios";
import axios from "axios";
const Repository: AxiosInstance = axios.create({
  baseURL: "http://13.204.25.170:8085/api/",
});

// Add a request interceptor to set the Authorization header
Repository.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

Repository.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default Repository;
