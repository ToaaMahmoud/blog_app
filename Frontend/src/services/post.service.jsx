import axios from "axios";

const baseUrl = "https://blog-app-seven-neon.vercel.app/api/v1"

const getToken = () => localStorage.getItem('accessToken')
const authHeaders = () =>({
    headers: { Authorization: `Bearer ${getToken()}` }
})
export const createPost = (postData) => axios.post(`${baseUrl}/posts/`, postData, authHeaders())
export const getPosts = () => axios.get(`${baseUrl}/posts/`, authHeaders())
export const getPostById = (postId) => axios.get(`${baseUrl}/posts/${postId}`, authHeaders())
export const updatePost = (postId, postData) => axios.patch(`${baseUrl}/posts/${postId}`, postData, authHeaders())
export const deletePost = (postId) => axios.delete(`${baseUrl}/posts/${postId}`, authHeaders())
