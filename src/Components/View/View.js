import React,{useContext, useEffect,useState} from 'react';
import { PostContext } from '../../store/PostContext';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../firebase/Firebase';


import './View.css';
function View() {
  const {productDetails}=useContext(PostContext)
  const [userDetails,setUserDetails]=useState(null)
  useEffect(()=>{
    const userId=productDetails.userId
    const q=query(collection(db, "users"), where("id", "==", userId))
    getDocs(q).then((response)=>{
      response.forEach((doc) => {
        setUserDetails(doc.data())
        console.log(doc.data());
      });
      
    }).catch((error)=>{
      alert(error.message)
    })
  },[])
  return (
    <div className="viewParentDiv">
      <div className="imageShowDiv">
        <img
          src={productDetails.url}
          alt=""
        />
      </div>
      <div className="rightSection">
        <div className="productDetails">
          <p>&#x20B9; {productDetails.price} </p>
          <span>{productDetails.name}</span>
          <p>{productDetails.category}</p>
          <span>{productDetails.createdAt}</span>
        </div>
       {userDetails && <div className="contactDetails">
          <p>Seller details</p>
          <p>{userDetails.username}</p>
          <p>{userDetails.phoneNUmber}</p>
        </div>}
      </div>
    </div>
  );
}
export default View;
