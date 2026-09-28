// Centralized API setup

import axios from 'axios';
import qs from 'qs';

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    'https://homelyhubinternship-9z7i.onrender.com/api',

  withCredentials: true,

  paramsSerializer: params =>
    qs.stringify(params, { arrayFormat: 'repeat' }),
});