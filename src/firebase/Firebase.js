import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCIsr151HxObu2Gw3kKNAqwdJLeqZH62dM",
    authDomain: "react-olx-clone-709b0.firebaseapp.com",
    projectId: "react-olx-clone-709b0",
    storageBucket: "react-olx-clone-709b0.appspot.com",
    messagingSenderId: "683689320511",
    appId: "1:683689320511:web:0709a1ac9555a9e0e8d88a",
    measurementId: "G-021KPNPWVZ"
  };
const Firebase=initializeApp(firebaseConfig);
const db = getFirestore(Firebase)
const auth = getAuth(Firebase);
const storage = getStorage(Firebase)
 
export  {auth,db,storage};