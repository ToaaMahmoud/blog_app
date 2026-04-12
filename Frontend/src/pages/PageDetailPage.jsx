import React, { useEffect, useState } from 'react'
import { getPostById } from '../services/post.service'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

function PageDetailPage() {
    const [post, setPost] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await getPostById(id)
                setPost(res.data.data)
            } catch (error) {
                toast.error('Failed to fetch the post')
                console.log(error);
            }
        }
        fetchPost()
    }, [id])
    if (!post) return (
        <div className="flex justify-center items-center h-96 text-gray-400">
            Loading...
        </div>
    )
    return (
        <div className="max-w-3xl mx-auto px-6 py-12">
            <button
                onClick={() => navigate(-1)}
                className="text-sm text-gray-400 hover:text-neutral-900 mb-8 flex items-center gap-1 cursor-pointer"
            >
                ← Back
            </button>

            <img
                src={post.image.url}
                alt={post.title}
                className="w-full h-72 object-cover rounded-xl mb-8"
            />

            <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-full bg-neutral-900 flex items-center justify-center text-white text-sm font-bold">
                    {post.author?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-600">
                    {post.author?.name}
                </span>
            </div>

            <h1 className="text-3xl font-black text-neutral-900 mb-4">
                {post.title}
            </h1>

            <div className="w-12 h-1 bg-neutral-900 rounded-full mb-6" />

            <p className="text-gray-600 leading-relaxed text-base">
                {post.description}
            </p>
        </div>
    )
}

export default PageDetailPage
