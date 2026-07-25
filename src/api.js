import axios from 'axios';

const API_URL = "https://movie-platform-backend-g5w5.onrender.com";

const API = axios.create({
  baseURL: API_URL,
});

export default API;