// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'https://menu-management-system-a4jn.onrender.com',
});

export default API;
