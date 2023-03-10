import './register.css'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Register({setShowRegister}){
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        try {
            await axios.post("/users_routes/register", newUser);
            setError(false);
            setSuccess(true);
        } catch (err) {
            setError(true);
        }
    };

    return(
        <div className='registerContainer'>
            <div className='logo'>
                <FmdGoodIcon/>
                YourMap
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='username' ref={nameRef}/>
                <input type='email' placeholder='email' ref={emailRef}/>
                <input type='password' placeholder='password' ref={passwordRef}/>
                <button>Register</button>
                {success &&
                    <span className='success'>Successfull. You can login now!</span>
                } 
                {error &&
                    <span className='failure'>Something went wrong!</span>
                }
            </form>
            <CancelIcon className='registerCancel' onClick={ () => setShowRegister(false) }/> 

        </div>
    )
}