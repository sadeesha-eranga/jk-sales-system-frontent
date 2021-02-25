import axios from 'axios';
import Cookies from "js-cookie";

const instance = axios.create({
    baseURL: 'http://localhost:8080/api/v1'
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  request => {
    if (Cookies.get('accessToken') !== undefined) {
      request.headers.Authorization = 'Bearer ' + Cookies.get('accessToken');
      // request.headers.Authorization = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJicmFuY2hfdXNlciIsInJvbGVzIjpbIk5PUk1BTCJdLCJleHAiOjE2MTQzMTkyMDUsImlhdCI6MTYxNDIzMjgwNX0.1-cNwtkSszAFoN4NkuR2IULbUQM_FJIIvZ39nBce-9k';
    }
    return request;
  },
  error => error
);

instance.interceptors.response.use(
  response => response,
  async (error) => {
    const status = error.response ? error.response.status : 0;
    if (status === 401) {
      window.location = "/login";
    }
  }
);

export default instance;
