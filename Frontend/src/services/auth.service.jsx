import api from "./api.service"

export const register = (userData) => api.post('/auth/register', userData)
export const login = (userData) => api.post('/auth/login', userData)
