import axios from "axios";

const baseUrl = "https://blog-app-seven-neon.vercel.app/api/v1/posts"

const getToken = () => localStorage.getItem('accessToken')
const authHeaders = () =>({
    headers: { Authorization: `Bearer ${getToken()}` }
})
export const createPost = (postData) => axios.post(`${baseUrl}/`, postData, authHeaders())
export const getPosts = () => axios.get(`${baseUrl}/`, authHeaders())
export const getUserPosts = () => axios.get(`${baseUrl}/user-posts`, authHeaders())
export const getPostById = (postId) => axios.get(`${baseUrl}/${postId}`, authHeaders())
export const updatePost = (postId, postData) => axios.patch(`${baseUrl}/${postId}`, postData, authHeaders())
export const deletePost = (postId) => axios.delete(`${baseUrl}/${postId}`, authHeaders())
