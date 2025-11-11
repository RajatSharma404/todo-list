import axios from './axiosConfig';

const todoService = {
  getTodos: async (filters = {}) => {
    const params = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] && filters[key] !== 'all') {
        params.append(key, filters[key]);
      }
    });

    const response = await axios.get(`/todos?${params.toString()}`);
    return response.data;
  },

  addTodo: async (todoData) => {
    const response = await axios.post('/todos', todoData);
    return response.data;
  },

  updateTodo: async (id, todoData) => {
    const response = await axios.put(`/todos/${id}`, todoData);
    return response.data;
  },

  deleteTodo: async (id) => {
    const response = await axios.delete(`/todos/${id}`);
    return response.data;
  },

  toggleTodo: async (id) => {
    const response = await axios.put(`/todos/${id}/toggle`);
    return response.data;
  }
};

export default todoService;
