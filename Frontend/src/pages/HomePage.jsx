import React, { useEffect, useState } from 'react'
import { getPosts } from '../services/post.service'
import { toast } from 'react-hot-toast';
import PostCard from '../components/PostCard';

function HomePage() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await getPosts()
                // console.log(res.data.data);
                setPosts(res.data.data)
            } catch (error) {
                if (error.response?.status !== 401) {
                    toast.error('Faild to load posts')
                }
                console.error(error);

            }
        }
        fetchPosts()
    }, [])
    // console.log(posts);

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map(p => (
                    <PostCard key={p._id} data={p} />
                ))}
            </div>
        </div>
    )
}

export default HomePage
