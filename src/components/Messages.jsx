import React from 'react'
import  Message from './Message'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatCOntext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
export default function Messages() {
  const {data} = useContext(ChatContext)
  const [messages, setMessages] = useState([])
  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists && setMessages(doc.data().messages)})
      return () =>{
        unSub()
      }
  },[data.chatId])
  return (
    <div className='messages'>
    {messages.map(m=>(
      <Message message={m} key={m.id} />
    ))}
    </div>
  )
}
