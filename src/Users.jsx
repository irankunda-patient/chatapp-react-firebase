import React from 'react'
import { signOut } from 'firebase/auth'
import Cookies from 'universal-cookie'
import { auth } from './firebase-config'
import Status from './components/Status'

const cookies = new Cookies()

const Users = ({setIsAuth}) => {
  const handleLogOut = async ()=>{
    await signOut(auth)
    cookies.remove("auth-token")
    setIsAuth(false)
  }
  return (
    <div className='border-none absolute right-0 w-[17%] h-[100vh] flex flex-col-reverse justify-end items-center gap-5 p-5'>
      <button className='bg-white rounded-lg px-5 py-2 font-extralight hover:bg-blue-600 hover:text-white' onClick={()=>handleLogOut()}>Signout</button>
      <div className='flex gap-2 w-full'>
        <img src={auth.currentUser?.photoURL} alt="" className='w-[40px] h-[40px] rounded-full bg-slate-400'/>
        <Status/>
        <p className='text-slate-400'>{auth.currentUser?.displayName}</p>
      </div>
    </div>
  )
}

export default Users
