import React, { useState } from 'react'
import logo from '../assets/logo.jpg'
import google from '../assets/google.jpg'
import axios from 'axios'
import { serverUrl } from '../App'
import { MdOutlineRemoveRedEye, MdRemoveRedEye } from "react-icons/md";
import { useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../utils/Firebase'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'

function SignUp() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("student")
    const navigate = useNavigate()
    let [show, setShow] = useState(false)
    const [loading, setLoading] = useState(false)
    let dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(serverUrl + "/api/auth/signup", { name, email, password, role }, { withCredentials: true })
            dispatch(setUserData(result.data))

            navigate("/")
            toast.success("Account Created Successfully")
            setLoading(false)
        }
        catch (error) {
            console.log(error)
            setLoading(false)
            toast.error(error.response?.data?.message || "Signup Failed")
        }

    }
    const googleSignUp = async () => {
        try {
            const response = await signInWithPopup(auth, provider)
            let user = response.user
            let name = user.displayName;
            let email = user.email

            const result = await axios.post(serverUrl + "/api/auth/googlesignup", { name, email, role }, { withCredentials: true })
            dispatch(setUserData(result.data))
            navigate("/")
            toast.success("Signed in with Google")
        } catch (error) {
            console.log(error)
            toast.error(error.response?.data?.message || "Google Sign-in Failed")
        }

    }

    return (
        <div className='min-h-screen w-full bg-blue-50 flex items-center justify-center p-4 font-sans'>
            <div className='w-full max-w-4xl bg-white shadow-2xl rounded-2xl flex overflow-hidden'>
                
                {/* LEFT SIDE - FORM */}
                <div className='w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center'>
                    <div className='mb-8'>
                        <h1 className='font-bold text-slate-800 text-3xl mb-2'>Create Account</h1>
                        <h2 className='text-slate-500 text-base'>Join our learning community today</h2>
                    </div>

                    <form className='flex flex-col gap-5' onSubmit={(e) => e.preventDefault()}>
                        
                        {/* Name Input */}
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold text-slate-700'>Full Name</label>
                            <input 
                                type="text" 
                                className='w-full h-10 border border-slate-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
                                placeholder='John Doe' 
                                onChange={(e) => setName(e.target.value)} 
                                value={name} 
                            />
                        </div>

                        {/* Email Input */}
                        <div className='flex flex-col gap-1'>
                            <label className='text-sm font-semibold text-slate-700'>Email Address</label>
                            <input 
                                type="email" 
                                className='w-full h-10 border border-slate-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
                                placeholder='name@example.com' 
                                onChange={(e) => setEmail(e.target.value)} 
                                value={email} 
                            />
                        </div>

                        {/* Password Input */}
                        <div className='flex flex-col gap-1 relative'>
                            <label className='text-sm font-semibold text-slate-700'>Password</label>
                            <input 
                                type={show ? "text" : "password"} 
                                className='w-full h-10 border border-slate-300 rounded-lg px-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all'
                                placeholder='••••••••' 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
                            />
                            <div className='absolute right-3 top-9 cursor-pointer text-slate-400 hover:text-blue-600 transition-colors' onClick={() => setShow(!show)}>
                                {show ? <MdRemoveRedEye size={20} /> : <MdOutlineRemoveRedEye size={20} />}
                            </div>
                        </div>

                        {/* Role Selection */}
                        <div className='flex items-center gap-4 mt-2'>
                            <span className='text-sm font-semibold text-slate-700'>I am a:</span>
                            <div className='flex bg-slate-100 p-1 rounded-lg'>
                                <button 
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${role === 'student' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    onClick={() => setRole("student")}
                                >
                                    Student
                                </button>
                                <button 
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${role === 'educator' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                                    onClick={() => setRole("educator")}
                                >
                                    Educator
                                </button>
                            </div>
                        </div>

                        {/* Sign Up Button */}
                        <button 
                            className='w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center mt-2 shadow-lg shadow-blue-500/30' 
                            disabled={loading} 
                            onClick={handleSignUp}
                        >
                            {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
                        </button>

                        {/* Divider */}
                        <div className='flex items-center gap-2 my-1'>
                            <div className='h-[1px] bg-slate-200 flex-1'></div>
                            <span className='text-xs text-slate-400'>OR CONTINUE WITH</span>
                            <div className='h-[1px] bg-slate-200 flex-1'></div>
                        </div>

                        {/* Google Button */}
                        <button 
                            className='w-full h-11 border border-slate-200 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-50 transition-all' 
                            onClick={googleSignUp}
                        >
                            <img src={google} alt="Google" className='w-5' />
                            <span className='text-sm font-medium text-slate-600'>Google</span>
                        </button>

                        <div className='text-center text-sm text-slate-500 mt-2'>
                            Already have an account? <span className='text-blue-600 font-semibold cursor-pointer hover:underline' onClick={() => navigate("/login")}>Log in</span>
                        </div>
                    </form>
                </div>

                {/* RIGHT SIDE - BRANDING */}
                <div className='hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-900 flex-col items-center justify-center p-12 text-white relative overflow-hidden'>
                    <div className='absolute top-0 left-0 w-full h-full opacity-10 bg-[url("https://www.transparenttextures.com/patterns/cubes.png")]'></div>
                    <img src={logo} className='w-32 h-32 rounded-full shadow-2xl mb-8 border-4 border-white/20' alt="Logo" />
                    {/* Changed Virtual Courses to TLE Terminators */}
                    <h2 className='text-3xl font-bold mb-4'>TLE Terminators</h2>
                    <p className='text-blue-100 text-center text-lg leading-relaxed'>
                        Unlock your potential with world-class education. Join thousands of learners today.
                    </p>
                </div>

            </div>
        </div>
    )
}

export default SignUp