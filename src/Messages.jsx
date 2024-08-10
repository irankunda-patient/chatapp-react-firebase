import React, { useEffect, useRef, useState } from 'react'
import { FaTelegramPlane } from 'react-icons/fa'
import Chat from './components/Chat'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where } from 'firebase/firestore'
import { auth, firestore } from './firebase-config'

const Messages = ({ group, newMessage, setNewMessage }) => {
  const messagesRef = collection(firestore, "messages")
  const [messages, setMessages] = useState([])
  
  useEffect(()=>{
    if (group == null) return;
    
    const queryMessages = query(messagesRef, where('group', '==', group), orderBy('createdAt'))
    const unSubscribe =  onSnapshot(queryMessages, (snapshot)=>{
      let messages = []
      snapshot.forEach((doc) =>{
        messages.push({...doc.data(), id: doc.id })
      })
      setMessages(messages)
    })
    return ()=> unSubscribe()
  }, [group])

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (group == null || newMessage === "") return;
  
    try {
      await addDoc(messagesRef, {
        text: newMessage,
        user: auth.currentUser.displayName,
        profile: auth.currentUser.photoURL,
        createdAt: serverTimestamp(),
        group,
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className='relative border-r h-[100vh] w-[100vh] flex flex-col justify-start items-start -space-x-[135px]'>
      <header className=''>
        <h1 className='text-white font-bold text-[36px]'>{group == null ?"<Choose Room/>":`<Room:${group}>` }</h1>
      </header>
      
        <Chat group={group} messages={messages}/>
      <form className='fixed bottom-10 flex justify-center items-center bg-white rounded-xl overflow-hidden
       right-[25%]' onSubmit={handleSubmit}>

        <textarea placeholder='write message ...' className='w-[500px] resize-none overflow-hidden p-2 outline-none
         text-slate-800 font-semibold text-[18px]' spellCheck='false' onChange={(e)=> setNewMessage(e.target.value)} value={newMessage}/>
        <button type="submit" className={`p-4 ${newMessage == ""? "cursor-no-drop":"cursor-pointer"}`}><FaTelegramPlane size={42} className={`${newMessage== "" ?'fill-blue-400': 'fill-blue-800'}`} /></button>
      </form>
    </div>
  )
}

export default Messages
