import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut
} from "firebase/auth";

import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

// Custom Hook to use AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
}

const googleProvider = new GoogleAuthProvider();

// Auth Provider Component

export const AuthProvider = ({ children }) => { 
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register User
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password);
    };

    // Login User
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    };

    // Google Sign-In
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider);
    };
     const logout=()=>{
        return signOut(auth)
     }

     useEffect(()=>{
     const  unsubscribe=onAuthStateChanged(auth,(user)=>{
        setCurrentUser(user)
        setLoading(false)
        if(user){
            const{email,displayName,photoURL}=user;
            const userData={
                email,username:displayName,photo:photoURL
            }
        }

     })
     return ()=>unsubscribe()
     },[])
    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>  
            {children}
        </AuthContext.Provider>
    );
};
