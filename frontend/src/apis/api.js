import axios from "axios";
import ShowToast from "../components/ShowToast";
import logo from "../assets/logo.png"

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  timeout: 5000,
  headers: {"Content-Type":"application/json"} // To tell server: req. body is in json format
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // TODO Future work: token integration
    return config;
  },
  (error) => {
    showCustomToast({
      image: logo,
      title: "Request Failed",
      subtitle: error.message
    });
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    showCustomToast({
      image: logo,
      title: "Server Error",
      subtitle: "Something went wrong. Please try again."
    });
    
    return Promise.reject(error);
  }
);

export default api; 
