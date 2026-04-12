import api from '../services/api.service'

export const getPosts = () => api.get('/posts')
export const getUserPosts = () => api.get('/posts/user-posts')
export const getPostById = (postId) => api.get(`/posts/${postId}`)
export const createPost = (postData) => api.post('/posts', postData)
export const updatePost = (postId, postData) => api.patch(`/posts/${postId}`, postData)
export const deletePost = (postId) => api.delete(`/posts/${postId}`)