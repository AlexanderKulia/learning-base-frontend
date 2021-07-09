import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  responseType: "json",
  withCredentials: true
});

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const data = error.response;
    if (data.status === 401) {
      return Promise.resolve(data);
    } else {
      return Promise.reject(error);
    }
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error.response.data);
  }
);

const { get, post, put, delete: destroy, patch } = apiClient;
export { get, post, put, destroy, patch };
