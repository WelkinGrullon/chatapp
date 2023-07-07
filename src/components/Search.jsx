import React from 'react'
import { collection, doc, query, where, getDocs, setDoc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from '../firebase';
import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
export const Search = () => {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null)
    const [err, setErr] = useState(false)
    const {currentUser} = useContext(AuthContext)
    const handleSearch = async () => {
        const q = query(collection(db, "users"), where("displayName", "==" , username));
        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
            setUser(doc.data())
        });
        }
        catch(err){
            setErr(true)
        }
    }
    const handleKey = (e) => {
      e.code === "Enter" && handleSearch()
    }
    const handleSelect =  async () => {
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : 
        user.uid + currentUser.uid
        try {
            const res = await getDoc(doc(db, "chats", combinedId))
            if (!res.exists()){
                await setDoc(doc(db,"chats",combinedId),{ messages: []})
                await updateDoc(doc(db, "userChats", currentUser.uid),{
                    [combinedId+".userInfo"]:{
                        uid: user.uid,
                        displayName: user.displayName,
                        photoURL:user.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                });
                await updateDoc(doc(db, "userChats", user.uid),{
                    [combinedId+".userInfo"]:{
                        uid:currentUser.uid,
                        displayName:currentUser.displayName,
                        photoURL:currentUser.photoURL
                    },
                    [combinedId+".date"]:serverTimestamp()
                })
            }
        } catch (err){
            setErr(true)
        }
        setUser(null)
        setUsername('')
    }
  return (
    <div className='search'>
        <div className='searchForm'>
            <input onChange={e => setUsername(e.target.value)} onKeyDown={handleKey} value={username} type='text' placeholder='find a user'/ >
        </div>
        {err && <span>user not found</span>}
        {user && <div className='userChat' onClick={handleSelect}>
            <img src={user.photoURL} />
            <div className='userChatInfo'>
                <span className='displayName'>
                    {user.displayName}
                </span>
            </div>
        </div>}
    </div>
  )
}
