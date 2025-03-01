import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000"
});

// Response interceptor to refresh the access token on 401 errors
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // If error response is 401 and we haven't retried yet
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Get refresh token from localStorage
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        try {
          // Call the refresh endpoint
          const response = await axios.post(`${process.env.REACT_APP_API_URL}/auth/refresh`, { refreshToken });
          const { accessToken } = response.data;
          // Update access token in localStorage
          localStorage.setItem("accessToken", accessToken);
          // Set new access token in headers and retry original request
          originalRequest.headers["Authorization"] = "Bearer " + accessToken;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
