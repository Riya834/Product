import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/auth',
});

export const loginUser = async (data) => {
  return await api.post('/login', data);
};


