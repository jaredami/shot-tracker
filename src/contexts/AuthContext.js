import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserData, setCurrentUserData] = useState();
  const [loading, setLoading] = useState(true);

  function signup(userName, email, password) {
    return auth.createUserWithEmailAndPassword(email, password).then((resp) => {
      db.collection("users")
        .doc(resp.user.uid)
        .set({ email: resp.user.email, userName: userName });
    });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    // TODO: Understand what is happening here better
    const unsubscribeAuthState = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    if (!currentUser) return unsubscribeAuthState;

    const unsubscribeCurrentUser = db
      .collection("users")
      .doc(currentUser.uid)
      .onSnapshot((doc) => {
        setCurrentUserData(doc.data());
      });
    unsubscribeCurrentUser();

    return unsubscribeAuthState;
  }, [currentUser]);

  const value = {
    currentUser,
    currentUserData,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
