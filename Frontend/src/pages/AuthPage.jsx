import React, { useState } from 'react'
import { login, register } from './../services/auth.service';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import z from 'zod'

const registerSchema = z.object({
    name: z.string()
        .min(1, 'Full Name is required')
        .min(3, 'Name must be at least 3 characters'),
    email: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string()
        .min(1, 'Please confirm your password')
}).refine(data => data.password === data.confirmPassword, { 
    message: 'The passwords you entered do not match', 
    path: ['confirmPassword'] 
});
const loginSchema = z.object({
    email: z.string()
        .min(1, 'Email is required')
        .email('Please enter a valid email address'),
    password: z.string()
        .min(6, 'Password must be at least 6 characters'),
})
function AuthPage() {
    const [activeTab, setActiveTab] = useState('login')
    const [formData, setFormData] = useState({
        name: '',
        password: '',
        email: '',
        confirmPassword: ''
    })
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validate()) return
        try {
            setLoading(true)
            const authAction = activeTab === 'register' ? register : login

            const payLoad = activeTab === 'register' ? formData : { email: formData.email, password: formData.password }
            const res = await authAction(payLoad)
            const { user, accessToken, refreshToken } = res.data?.data || {}

            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)

            toast.success(`${activeTab === 'register'? 'Account created!': 'Welcome back!'}`)
            setTimeout(() => navigate('/'), 1500)
        } catch (error) {
            toast.error(error.response.data.error.message || "Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setErrors({})
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    };
    const handleOnChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })

        if (errors[e.target.name]) {
            setErrors(newErrors => {
                const updatedErrors = { ...newErrors }
                delete updatedErrors[e.target.name]
                return updatedErrors
            })
        }
    }
    const validate = () => {
        const schema = activeTab === 'register' ? registerSchema : loginSchema
        const result = schema.safeParse(formData)

        if (!result.success) {
            const newErrors = {}
            result.error?.issues.forEach(err => {
                newErrors[err.path[0]] = err.message
            })
            setErrors(newErrors)
            return false
        }
        setErrors({})
        return true
    }
    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-neutral-900 flex flex-col gap-6 justify-center px-16 py-12 text-white">
                <h1 className='text-4xl font-black'>Ink</h1>
                <h2 className='text-3xl font-bold'>Start your journey here.</h2>
                <p className='text-neutral-400 text-sm'>Create an account and join a community of writers sharing what matters to them.</p>
                <p className='italic text-neutral-500 mt-8'>"You don't start out writing good stuff. You start out writing crap." — Ira Glass</p>
            </div>
            <div className="w-1/2 flex flex-col justify-center px-16">
                <div className="flex gap-6 mb-8 border-b border-gray-100">
                    <button
                        onClick={() => handleTabChange('login')}
                        className={`pb-3 text-sm font-semibold relative ${activeTab === 'login'
                            ? 'text-neutral-900'
                            : 'text-gray-400 hover:text-gray-600 cursor-pointer'
                            }`}
                    >
                        Login
                        {activeTab === 'login' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 rounded-full" />
                        )}
                    </button>

                    <button
                        onClick={() => handleTabChange('register')}
                        className={`pb-3 text-sm font-semibold relative ${activeTab === 'register'
                            ? 'text-neutral-900'
                            : 'text-gray-400 hover:text-gray-600 cursor-pointer'
                            }`}
                    >
                        Register
                        {activeTab === 'register' && (
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 rounded-full" />
                        )}
                    </button>
                </div>
                <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                    {activeTab === 'register' &&
                        (<div className='flex flex-col gap-2'>
                            <label className='text-xl font-semibold text-gray-600 tracking-wide' htmlFor="name">Full Name</label>
                            <input
                                onChange={handleOnChange}
                                className={`w-full px-4 py-3 border border-gray-200 rounded-md ${errors.name? 'border-red-500 focus:ring-red-500': 'border-gray-200 focus:border-neutral-900'}`}
                                id="name"
                                name='name'
                                type="text"
                                value={formData.name}
                                placeholder='e.g Toaa Mahmoud' />
                            {errors.name && <p className='text-red-500 text-sm'>{errors.name}</p>}
                        </div>)}
                    <div className='flex flex-col gap-2'>
                        <label className='text-xl font-semibold text-gray-600 tracking-wide' htmlFor="email">Email</label>
                        <input
                            onChange={handleOnChange}
                            className={`w-full px-4 py-3 border border-gray-200 rounded-md ${errors.email? 'border-red-500 focus:ring-red-500': 'border-gray-200 focus:border-neutral-900'}`}
                            id='email'
                            name='email'
                            type="email"
                            value={formData.email}
                            placeholder='you@example.com' />
                        {errors.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='text-xl font-semibold text-gray-600 tracking-wide' htmlFor="password">Password</label>
                        <input
                            onChange={handleOnChange}
                            className={`w-full px-4 py-3 border border-gray-200 rounded-md ${errors.password? 'border-red-500 focus:ring-red-500': 'border-gray-200 focus:border-neutral-900'}`}
                            id='password'
                            name='password'
                            type="password"
                            value={formData.password}
                            placeholder='Min 6 Characters' />
                        {errors.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                    </div>
                    {activeTab === 'register' &&
                        (<div className='flex flex-col gap-2'>
                            <label className='text-xl font-semibold text-gray-600 tracking-wide' htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                onChange={handleOnChange}
                                className={`w-full px-4 py-3 border border-gray-200 rounded-md ${errors.confirmPassword? 'border-red-500 focus:ring-red-500': 'border-gray-200 focus:border-neutral-900'}`}
                                id='confirmPassword'
                                name='confirmPassword'
                                type="password"
                                value={formData.confirmPassword}
                                placeholder='Min 6 Characters' />
                            {errors.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
                        </div>)}

                    <button className='btn bg-neutral-900 text-white hover:bg-neutral-700 w-full rounded-md'
                        type='submit' disabled={loading}>
                        {loading ? (<span>Processing...</span>) : (activeTab === 'register' ? 'Create Account' : 'Sign In')}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AuthPage
