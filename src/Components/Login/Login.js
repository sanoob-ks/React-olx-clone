import React,{useState} from 'react';

import Logo from '../../olx-logo.png';
import './Login.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth,db} from '../../firebase/Firebase'
import {useNavigate} from 'react-router-dom'

function Login() {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()

  const handleLogin=(e)=>{
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    navigate('/')
    
   
  })
  .catch((error) => {
    // login fail come here
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });

  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="Sanoob"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button >Login</button>
        </form>
        <div className='signup'>
        <p>New to OLX? <span onClick={()=>navigate('/signup')}>Signup</span></p>
        </div>
      </div>
      </div>
  );
}

export default Login;
