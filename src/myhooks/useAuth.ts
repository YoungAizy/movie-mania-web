import { useContext } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase.ts";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import {
//   getDownloadURL,
//   ref as storageRef,
//   uploadString,
// } from 'firebase/storage';
import { AuthContext } from "../Context/AuthContext.tsx";

export const isLoggedIn = () => {
  const loggedIn = JSON.parse(localStorage.getItem("user"))?.loggedIn;
  return loggedIn;
};

const useAuth = () => {
  const { setUser, setLoggedIn } = useContext(AuthContext);

  const register = async (userData, cb) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        userData.email,
        userData.password,
      );
      setUser(user);
      // if(userData.picture){
      //   const reference = storageRef(storage, 'profile_pics/' + user.uid);
      //   const result = await uploadString(reference, userData.picture, 'data_url', {
      //     contentType: userData.metadata,
      //   });
      //   const url = result && (await getDownloadURL(reference));
      //   await updateProfile(user, { photoURL: url, displayName:userData.username });
      //   if(result) cb();
      // }else{
      // }
      updateProfile(user, { displayName: userData.username }).then(() => cb());
    } catch (error) {
      cb(error);
    }
  };
  const login = async (email: string, password: string) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    localStorage.setItem("auth", JSON.stringify(user));
    const userObj = {
      username: user.displayName,
      userId: user.uid,
      // picture: user.photoURL,
      email: user.email,
      verified: user.emailVerified,
      loggedIn: true,
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setUser(userObj);
    user && setLoggedIn(userObj.loggedIn);
    return user;
  };
  return { register, login };
};

export default useAuth;
