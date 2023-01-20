import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Context, { FirebaseContext } from './store/Contexts';
//import {auth} from './firebase/Firebase'




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
  <React.StrictMode>
    <FirebaseContext.Provider >
        <Context>
    <App />  {/* this App is now children of Context component & passing into props.children of Context */}
    </Context>
    </FirebaseContext.Provider>
      
  </React.StrictMode>
);
