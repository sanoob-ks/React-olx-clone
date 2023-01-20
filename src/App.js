import React,{useEffect,useContext} from 'react';
import './App.css';
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import SignupPage from './Pages/Signup';
import LoginPage from './Pages/Login';
import Create from './Pages/Create'
import ViewPost from './Pages/ViewPost'
import { AuthContext } from './store/Contexts';
import { auth } from './firebase/Firebase';
import {onAuthStateChanged } from "firebase/auth";
import Post from './store/PostContext';


function App() {
  const {user,setUser}=useContext(AuthContext)
  useEffect(()=>{
       //console.log("user",user)
       //vanish only when logout
       onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
          setUser(user)
          //console.log("user",user)
          //const uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
      });
  })
  return (
    <div>
     <Post>
      <Router>
        <Routes>
            <Route element={<Home/>} path='/'/>
            <Route element={<SignupPage/>} path='/signup'/>
            <Route element={<LoginPage/>} path='/login'/>
            <Route element={<Create/>} path='/create'/>
            <Route element={<ViewPost/>} path='/view'/>
        </Routes>
      </Router>
      </Post> 
      
    </div> 
  );
}

export default App;
  