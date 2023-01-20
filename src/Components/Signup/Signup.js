import React,{useState,useContext} from 'react';
import Logo from '../../olx-logo.png';
//import { FirebaseContext } from '../../store/FireContext';
import './Signup.css';
import {  createUserWithEmailAndPassword,getAuth } from "firebase/auth";
import {auth,db} from '../../firebase/Firebase'
import { collection, addDoc } from "firebase/firestore";
import {useNavigate} from 'react-router-dom'

export default function Signup() {
  const [username,setUsername]=useState('')
  const [email,setEmail]=useState('')
  const [phoneNUmber,setPhoneNUmber]=useState('')
  const [password,setPassword]=useState('')
  const navigate=useNavigate()
  //const {auth}=useContext(FirebaseContext)
  //const auth=getAuth()

  const signup=(e)=>{ 
      
      
      e.preventDefault();
      createUserWithEmailAndPassword(auth,email,password)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log(username)
        //user["displayName"]=username
        
        addDoc(collection(db, "users"), {
          id:user.uid,
          username: username,
          phoneNUmber: phoneNUmber
          
        });
        // alert("OK")
        // console.log(userCredential)
        // console.log(userCredential.user)
        //userCredential.user.updateProfile({displayName:username})
    // Signed in 
       
  }).then(()=>{
      navigate('/login')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
    alert(errorMessage)

  });
  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={signup}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e)=> setUsername(e.target.value)}
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phoneNUmber}
            onChange={(e)=> setPhoneNUmber(e.target.value)}
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
            onChange={(e)=> setPassword(e.target.value)}
          />
          <br />
          <br />
          <button  >Signup</button>
        </form>
        <div className='login'>
        <p>Already have an account? <span onClick={()=>navigate('/login')}>Login</span></p>
        </div>
      </div>
    </div>
  );
}
