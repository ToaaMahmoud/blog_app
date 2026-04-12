import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { createPost, getPostById, updatePost } from './../services/post.service';
import { toast } from 'react-hot-toast';

function AddPostPage() {
     const { id } = useParams()
    const isEditMode = !!id
    const navigate = useNavigate()

    const [formData, setFormData] = useState({ title: '', description: '' })
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!isEditMode) return
        const fetchPost = async () => {
            try {
                const res = await getPostById(id)
                const post = res.data.data
                setFormData({ title: post.title, description: post.description })
                setPreview(post.image.url)
            } catch {
                toast.error('Failed to load post')
            }
        }
        fetchPost()
    }, [id, isEditMode])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImage(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!isEditMode && !image) return toast.error('Please select an image')

        try {
            setLoading(true)
            const data = new FormData()
            data.append('title', formData.title)
            data.append('description', formData.description)
            if (image) data.append('image', image)

            if (isEditMode) {
                await updatePost(id, data)
                toast.success('Post updated!')
            } else {
                await createPost(data)
                toast.success('Post created!')
            }
            setTimeout(() => navigate('/user-posts'), 1500)
        } catch (error) {
            toast.error('Something went wrong')
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-bold text-neutral-900 mb-8">
                {isEditMode ? 'Edit Post' : 'New Post'}
            </h1>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-600">Title</label>
                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter post title"
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-neutral-900"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-600">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write your post content..."
                        rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:border-neutral-900 resize-none"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-600">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-md"
                    />
                    {preview && (
                        <img src={preview} alt="preview" className="mt-2 rounded-md h-48 object-cover w-full" />
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-neutral-900 text-white rounded-md hover:bg-neutral-700 cursor-pointer font-semibold"
                >
                    {loading ? 'Saving...' : isEditMode ? 'Update Post' : 'Publish Post'}
                </button>
            </form>
        </div>
    )
}

export default AddPostPage
