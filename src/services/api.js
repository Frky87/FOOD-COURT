import axios from 'axios';

const API_BASE = 'https://6834169b464b4996360140a4.mockapi.io/api/MenuHidangan';

export const getMenus = () => axios.get(API_BASE);
export const getMenuById = (id) => axios.get(`${API_BASE}/${id}`);
export const addMenu = (data) => axios.post(API_BASE, data);
export const updateMenu = (id, data) => axios.put(`${API_BASE}/${id}`, data);
export const deleteMenu = (id) => axios.delete(`${API_BASE}/${id}`);
