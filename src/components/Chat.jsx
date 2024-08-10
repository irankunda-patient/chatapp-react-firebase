import React from 'react'
import { useState } from 'react'
import { auth } from '../firebase-config'
import Status from './Status'

const Chat = (props) => {
    const {group, messages}  = props
    let Newmessages = messages
    return (
        <div className='w-[120%] max-h-[70vh] overflow-auto flex flex-col justify-around items-between px-5'>
            {Newmessages.map((message)=> (
                    <div key={message.id} className={`flex gap-2 p-2 ${message.user === auth.currentUser.displayName ? 'ml-10 flex-row sender': 'receiver'}`}>
                        <img src={message.profile} alt="profile" className='w-[40px] h-[40px] rounded-full bg-slate-400' />
                        {/* {auth.currentUser.displayName == message.user?"": <Status/>} */}
                        <span className='text-slate-300'>{message.user == auth.currentUser.displayName ? "me": message.user}</span><br />
                        <p className='text-white text-balance'> {message.text}</p>
                    </div>
                
        )
        )}
        </div>
    )
}

export default Chat
