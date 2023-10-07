import axios from 'axios';

const baseApi = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
});

export default baseApi;
