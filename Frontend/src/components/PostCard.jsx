import React from 'react'

function PostCard({ data }) {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <img
                src={data.image.url}
                alt={data.title}
                className="w-full h-48 object-cover"
            />
            <div className="p-5 flex flex-col gap-2">
                <h2 className="text-lg font-bold text-neutral-900 leading-tight">
                    {data.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">
                    {data.description}
                </p>
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                        {data.author.name?.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">
                        {data.author.name}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PostCard