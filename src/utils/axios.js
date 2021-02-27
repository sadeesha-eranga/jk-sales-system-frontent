import axios from 'axios';
import Cookies from "js-cookie";
import { SERVER_URL } from '../constants';

const instance = axios.create({
    baseURL: SERVER_URL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  request => {
    if (Cookies.get('accessToken') !== undefined) {
      request.headers.Authorization = 'Bearer ' + Cookies.get('accessToken');
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
    } else {
      return Promise.reject(error);
    }
  }
);

export default instance;
