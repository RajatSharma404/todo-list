import axios from './axiosConfig';

const authService = {
  register: async (username, email, password) => {
    const response = await axios.post('/auth/register', {
      username,
      email,
      password
    });
    return response.data;
  },

  login: async (email, password) => {
    const response = await axios.post('/auth/login', {
      email,
      password
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  setToken: (token) => {
    localStorage.setItem('token', token);
  }
};

export default authService;
