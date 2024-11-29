import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/books', // Backend API base URL
});

export const getAvailableBooks = () => api.get('/available');
export const getCheckedOutBooks = () => api.get('/checked-out');
export const checkOutBook = (id, data) => api.put(`/checkout/${id}`, data);
export const checkInBook = (id) => api.put(`/checkin/${id}`);
export const addBook = (data) => api.post('/', data);
export const updateBook = (id, data) => api.put(`/${id}`, data);
export const deleteBook = (id) => api.delete(`/${id}`);
