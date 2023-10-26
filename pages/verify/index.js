import React, { useState, useEffect } from "react"
import {db} from '../../api/firebase'
import { doc, onSnapshot } from 'firebase/firestore'

import App from '../app'
import Auth from '../auth'
import Loading from './loading'

const Verify = () => {
  const [loaded, setLoaded] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const [user, setUser] = useState(null)
  const [userID, setUserID] = useState(null)
  
  useEffect(() => {
    setUserID(localStorage.getItem('user'))
    if (userID) {
      const docRef = doc(db, 'users', userID)
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          setUser(userData)
          setIsAuth(true)
        } else {
          setUser(null)
          setIsAuth(false)
        }
        setLoaded(true)
      });

      return () => {
        unsubscribe()
      };
    } else {
      setTimeout(() => {
        setLoaded(true)
      }, 2000);
    }
  }, [userID, isAuth, loaded]);
  
  return (
    !loaded?
      <Loading />:
    isAuth?
      <App user={user} />:
      <Auth setIsAuth={setIsAuth} />
  )
}

export default Verify