import React, { useState } from 'react'
import { Groups, Messages, Users } from './index.js'
import Signup from './components/Signup.jsx'

import Cookies from 'universal-cookie'
const cookies = new Cookies()
const App = () => {
  const [isAuth, setIsAuth] = useState(cookies.get('auth-token'))
  const [group, setGroup] = useState(null)
  const [newMessage, setNewMessage] = useState("") 
  
  if(!isAuth){
    return (
    <div><Signup setIsAuth={setIsAuth}/></div>
  )
  }
  return (

      <main className='relative w-full h-[100vh] overflow-hidden grid-cols bg-slate-800'>
        <section><Groups group={group} setGroup={setGroup}/></section>
        <section><Messages group={group} newMessage={newMessage} setNewMessage={setNewMessage}/></section>
        <section><Users setIsAuth={setIsAuth}/></section>
      </main>
  )
}

export default App
