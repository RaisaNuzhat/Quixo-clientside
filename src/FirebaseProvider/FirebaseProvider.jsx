/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword,signInWithEmailAndPassword ,signInWithPopup,signOut,updateProfile} from "firebase/auth";
import auth from "../firebase/firebase.init";
import { GoogleAuthProvider } from "firebase/auth";

import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";

//import { useLocation, useNavigate } from "react-router-dom";
export const AuthContext = createContext(null);

//social providers
const googleProvider = new GoogleAuthProvider();

const FirebaseProvider = ({children}) => {
    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    console.log(loading)
    console.log(user)
    //create user
    const createUser = (email, password) =>
    {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
        
    }
   const updateUserProfile = (name,image) =>
   {
    return updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: image,
      });
   }
  
        //signin user
        const signinUser = (email,password) =>

        {
           setLoading(true)
           return signInWithEmailAndPassword(auth, email, password)
        }
         //navigation system
  
        //google login
        const signinWithGoogle = () =>
        {
            setLoading(true)
            signInWithPopup(auth, googleProvider)
            .then(
                result =>
                {
                    if(result.user)
                    {
                        console.log(user)
                    }
                }
            )
        }
        //github login
       
              // save user
  const saveUser = async user => {
    const currentUser = {
      email: user?.email,
      role: 'user',
      status: 'Verified',
    }
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/user`,
      currentUser
    )
    return data
  }
  const logOut = () =>
    {
        setUser(null)
        
        signOut(auth)
    }
          //observer
        //   useEffect(() => {
        //     const unsubscribe = onAuthStateChanged(auth, currentUser => {
        //         const userEmail = currentUser?.email || user?.email;
        //         const loggedUser = { email: userEmail };
        //         setUser(currentUser);
        //         console.log('current user', currentUser);
        //         setLoading(false);
        //         // if user exists then issue a token
        //         if (currentUser) {
        //             axios.post('', loggedUser, { withCredentials: true })
        //                 .then(res => {
        //                     console.log('token response', res.data);
        //                 })
        //         }
        //         else {
        //             axios.post('', loggedUser, {
        //                 withCredentials: true
        //             })
        //                 .then(res => {
        //                     console.log(res.data);
        //                 })
        //         }
        //     });
        //     return () => {
        //         return unsubscribe();
        //     }
        // }, [])
               //observer
    useEffect(
        () =>
        {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (user) {
                 setUser(user)
                 saveUser(user)
                 setLoading(false)
                } else {
                  // User is signed out
                  // ...
                  setLoading(false)
                }
              });
              return () => unsubscribe()
        }
        ,[] )
    const allvalues = {
        createUser,
        signinUser,
        signinWithGoogle,
        logOut,
        user,
        loading,
        updateUserProfile,
        
    }
   
    return (
       
        <AuthContext.Provider value={allvalues}>
            {children}
        </AuthContext.Provider>
    );
};

export default FirebaseProvider;
