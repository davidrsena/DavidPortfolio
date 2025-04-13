import React, { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // 
//import { getAnalytics } from "firebase/analytics"; // 

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBQRPYBIxgXGtuX6bxvlmAgXiW0IyKQH38",
  authDomain: "david-s-portfolio-a4b16.firebaseapp.com",
  databaseURL: "https://david-s-portfolio-a4b16-default-rtdb.firebaseio.com",
  projectId: "david-s-portfolio-a4b16",
  storageBucket: "david-s-portfolio-a4b16.appspot.com",
  messagingSenderId: "231318324298",
  appId: "1:231318324298:web:8bb671bbe6dbbc047c92b3",
  measurementId: "G-9BBTDH5SXF",
};


const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
//const analytics = getAnalytics(app); //

const FirebaseContext = createContext();

export const FirebaseProvider = ({ children }) => {
  return (
    <FirebaseContext.Provider value={{ app, firestore }}>
      {children}
    </FirebaseContext.Provider>
  );
};

// Hook para usar o Firebase
export const useFirebase = () => {
  return useContext(FirebaseContext);
};

