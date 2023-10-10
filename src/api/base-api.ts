import axios from 'axios';

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  // withCredentials: true, если withCredentials = true, тогда падают CORS. Нужен для отправки куки с токеном при запросе
});

export default baseApi;
