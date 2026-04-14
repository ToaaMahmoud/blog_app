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
    const [errors, setErrors] = useState({})

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

    const validate = () => {
        const newErrors = {}
        if (!formData.title.trim()) newErrors.title = 'Title is required'
        if (!formData.description.trim()) newErrors.description = 'Description is required'
        if (!isEditMode && !image) newErrors.image = 'Image is required'
        return newErrors
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setErrors((prev) => ({ ...prev, [e.target.name]: '' }))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) return
        setImage(file)
        setPreview(URL.createObjectURL(file))
        setErrors((prev) => ({ ...prev, image: '' }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

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
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-neutral-900 ${
                            errors.title ? 'border-red-400' : 'border-gray-200'
                        }`}
                    />
                    {errors.title && (
                        <p className="text-sm text-red-500">{errors.title}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-600">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write your post content..."
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:border-neutral-900 resize-none ${
                            errors.description ? 'border-red-400' : 'border-gray-200'
                        }`}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-500">{errors.description}</p>
                    )}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-gray-600">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={`w-full px-4 py-3 border rounded-md ${
                            errors.image ? 'border-red-400' : 'border-gray-200'
                        }`}
                    />
                    {errors.image && (
                        <p className="text-sm text-red-500">{errors.image}</p>
                    )}
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