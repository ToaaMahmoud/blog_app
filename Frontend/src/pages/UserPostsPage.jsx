import React, { useEffect, useState } from 'react'
import { deletePost, getUserPosts } from '../services/post.service'
import toast from 'react-hot-toast'
import PostCard from '../components/PostCard'
import { useNavigate } from 'react-router-dom'

function UserPostsPage() {
    const [posts, setPosts] = useState([])
        const navigate = useNavigate()

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getUserPosts()
                console.log(res.data.data);
                setPosts(res.data.data)
            } catch (error) {
                toast.error('Faild to load your posts')
                console.error(error);

            }
        }
        fetchPosts()
    }, [])

    const handleDelete = async (postId) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return
        try {
            await deletePost(postId)
            setPosts(posts.filter(p => p._id !== postId))
            toast.success('Post delelted')
        } catch (error) {
            toast.error('Failed to delete post')
            console.log(error);
        }
    }
    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-neutral-900">My Posts</h1>
                <button
                    onClick={() => navigate('/posts/new')}
                    className="px-4 py-2 bg-neutral-900 text-white rounded-md text-sm hover:bg-neutral-700 cursor-pointer"
                >
                    + Add Post
                </button>
            </div>

            {posts.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-lg">No posts yet</p>
                    <p className="text-sm mt-1">Add your first post!</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map(p => (
                        <PostCard key={p._id} data={p} isOwner={true} onDelete={handleDelete} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default UserPostsPage
