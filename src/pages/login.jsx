import { useState } from "react"
import {useNavigate, Link } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
export default function Login(){
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const email = e.target[0].value;
        const password = e.target[1].value;
        try {
            await signInWithEmailAndPassword(auth, email, password)
            navigate('/')
        }
        catch (err){
            setErr(true)
        }

    }
    return (
        
        <>
        <div className="formContainer">
            <div className="formWrapper">
                <span className="registerLogo">Talkalot</span>
                <span className="registerName">Sign In</span>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" />
                    <input type="password" placeholder="Password" />
                    <button>Sign In</button>
                    {err && <span>something went wrong</span>}
                </form>
                <p>You don't have an account? <Link to='/register'>Register</Link></p>
         </div>
         </div>
        </>
    )
}