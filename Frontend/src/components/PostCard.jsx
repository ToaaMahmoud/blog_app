import React from 'react'
import { useNavigate } from 'react-router-dom'

function PostCard({ data, isOwner, onDelete }) {
    const navigate = useNavigate()

    return (
        <div 
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/posts/${data._id}`)}
        >
            <img
                src={data.image.url}
                alt={data.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col gap-2">
                <h2 className="text-lg font-bold text-neutral-900">{data.title}</h2>
                <p className="text-sm text-gray-500 line-clamp-2">{data.description}</p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                        {data.author.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{data.author.name}</span>
                </div>

                {isOwner && (
                    <div className="flex gap-2 mt-2">
                        <button
                            onClick={(e) => { e.stopPropagation(); navigate(`/posts/edit/${data._id}`) }}
                            className="flex-1 py-1.5 text-sm border border-neutral-900 text-neutral-900 rounded-md hover:bg-neutral-900 hover:text-white cursor-pointer"
                        >
                            Edit
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(data._id) }}
                            className="flex-1 py-1.5 text-sm border border-red-500 text-red-500 rounded-md hover:bg-red-500 hover:text-white cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostCard