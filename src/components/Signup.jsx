import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { FaGoogle } from 'react-icons/fa'
import { auth, provider } from '../firebase-config'

import Cookies from 'universal-cookie'
const cookies = new Cookies()
const Signup = ({setIsAuth}) => {

    const handleAuth = async ()=>{
        try {
            const result = await signInWithPopup(auth, provider)
            // console.log(result);
            cookies.set('auth-token', result.user.refreshToken)
            setIsAuth(true)
        } catch (error) {
            console.error(error);
        }
    }
    
    return (
        <div className='flex justify-center items-center h-[80vh] flex-col'>
            <h1 className='text-[32px] content-start font-bold text-slate-800'>Sign In with Google</h1>
            <button className='flex bg-blue-600 p-2 rounded-lg items-center gap-2 text-white hover:bg-blue-500' onClick={()=>handleAuth()}>Continue with <FaGoogle size={42} /></button>
        </div>
    )
}

export default Signup
