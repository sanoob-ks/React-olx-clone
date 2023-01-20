import React,{useContext, useEffect, useState} from 'react';

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { AuthContext } from '../../store/Contexts';
import {signOut } from "firebase/auth";
import { auth,db } from '../../firebase/Firebase';
import {useNavigate} from 'react-router-dom'
import { collection, query, where, getDocs } from "firebase/firestore";


function Header() {
  const {user}=useContext(AuthContext)
  const [userName,setUserName]=useState('')
  console.log(user);
  const navigate=useNavigate()
  useEffect(()=>{
    //alert("user")

    if(user){
      alert("user")
      const userId=user.uid
      const q=query(collection(db, "users"), where("id", "==", userId))
      getDocs(q).then((response)=>{
        response.forEach((doc) => {
          setUserName(doc.data().username)
          
        });
      })
    }
  },[user])

  const handleSignout=(e)=>{
    e.preventDefault()

signOut(auth).then(() => {
  // Sign-out successful.
  navigate('/login')
}).catch((error) => {
  // An error happened.
  alert(error.message)
});


  }
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          {user?<button>{userName}</button>:<button onClick={()=>navigate('/login')}>Login</button>}
          <hr />
        </div>
        <div className="loginPage">
        {user? <button onClick={handleSignout}>Logout</button>: <button onClick={()=>navigate('/signup')}>Signup</button>  }
          <hr />
        </div>
        {/* {user && <span onClick={handleSignout}>Logout</span> }
        
        {!user && <span className='signout' onClick={navigate('/signup')}>Signup</span> && <hr />} */}


        <div onClick={()=>navigate('/create')} className="sellMenu">
       
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span>SELL</span> 
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
