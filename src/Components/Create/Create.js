import React, { Fragment, useState, useContext } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { db, storage } from '../../firebase/Firebase';
import { addDoc,collection } from "firebase/firestore";
import { ref,getDownloadURL, uploadBytes } from "firebase/storage";
import { AuthContext } from '../../store/Contexts';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [price, setPrice] = useState('')
  const [image, setImage] = useState(null)
  const { user } = useContext(AuthContext)
  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (image) {
      const date=new Date()
      const imageRef = ref(storage, `images/${image.name}`)
      uploadBytes(imageRef, image).then((response) => {

        getDownloadURL(response.ref).then((url) => {
         
          addDoc(collection(db, "products"), {
            userId:user.uid,
            name,
            category,
            price,
            url,
            createdAt:date.toDateString()

            
          });
        })
      })
    }
    navigate('/')
  }

return (
  <Fragment>
    <Header />
    <card>
      <div className="centerDiv">
        <label htmlFor="fname">Name</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="Name"
          defaultValue="sanoob"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label htmlFor="fname">Category</label>
        <br />
        <input
          className="input"
          type="text"
          id="fname"
          name="category"
          defaultValue="John"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <br />
        <label htmlFor="fname">Price</label>
        <br />
        <input className="input" type="number" id="fname" name="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)} />
        <br />

        <br />
        <img alt="Posts" width="200px" height="200px" src={image ? URL.createObjectURL(image) : ''}></img>

        <br />
        <input onChange={(e) => setImage(e.target.files[0])} type="file" />
        <br />
        <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>

      </div>
    </card>
  </Fragment>
);
};

export default Create;
