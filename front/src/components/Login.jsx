import './login.css'
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import { useState } from 'react';
import { useRef } from 'react';
import axios from 'axios';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Login({setShowLogin, myStorage, setCurrentUser}){
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            username: usernameRef.current.value,
            password: passwordRef.current.value
        };

        try {
            const res = await axios.post("/users_routes/login", user);
            setCurrentUser(res.data.username);
            myStorage.setItem("user", res.data.username);
            setShowLogin(false); 
        } catch (err) {
            setError(true);
        }
    };

    return(
        <div className='loginContainer'>
            <div className='logo'>
                <FmdGoodIcon/>
                YourMap
            </div>
            <form onSubmit={handleSubmit}>
                <input type='text' placeholder='username' ref={usernameRef}/>
                <input type='password' min='6' placeholder='password' ref={passwordRef}/>
                <button className='loginBtn'>Login</button>
                {error &&
                    <span className='failure'>Something went wrong!</span>
                }
            </form>
            <CancelIcon className='loginCancel' onClick={ () => setShowLogin(false) }/> 

        </div>
    );
}