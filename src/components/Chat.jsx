import Cam from '../img/video-call-32.png'
import Dots from '../img/icons8-three-dots-30.png'
import Plus from '../img/plus-5-48.ico'
import Messages from './Messages'
import Input from './input'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatCOntext'
export default function Chat(){
    const {data} = useContext(ChatContext)
    return (
        <>
            <div className="chat">
                <div className="chatInfo">
                    <span>{data.user?.displayName}</span>
                    <div className="chatIcons">
                    <img src={Cam} />
                    <img src={Plus}/>
                    <img src={Dots} />
                    </div>
                    
                </div>
                <Messages />
                <Input />
            </div>
        </>
    )
}