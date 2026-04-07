import axios from 'axios'

const baseUrl = "https://blog-app-seven-neon.vercel.app/api/v1"

export const register = (userData) => axios.post(`${baseUrl}/auth/register`, userData)
export const login = (userData) => axios.post(`${baseUrl}/auth/login`, userData)
