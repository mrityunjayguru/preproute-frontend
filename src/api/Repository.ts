import { AxiosInstance } from "axios";
import axios from "axios";
// const baseUrl="http://147.93.19.155:3200/api/"
   const baseUrl="http://localhost:3200/api/"
// const baseUrl = "https://testbackend.thepreproute.com/api/";
//  const baseUrl="https://prodbackend.thepreproute.com/api/"

const Repository: AxiosInstance = axios.create({
  baseURL: baseUrl,
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

  (error) => Promise.reject(error),
);

Repository.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default Repository;
