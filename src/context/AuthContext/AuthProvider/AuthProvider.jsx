import { useEffect, useState } from "react";
import AuthContext from "../AuthContext";
import auth from "../../../firebase/firebaseConfig/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const API = import.meta.env.VITE_SERVER_URL;

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    let active = true;
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!active) return;
      setUser(currentUser);
      setUserRole(null);

      if (!currentUser) {
        setLoading(false);
        return;
      }

      try {
        // Firebase identifies the user; the server assigns the default applicant role
        // and returns any role already assigned by an administrator.
        const token = await currentUser.getIdToken();
        const response = await fetch(`${API}/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: currentUser.displayName || "",
            email: currentUser.email,
          }),
        });
        if (!response.ok) throw new Error("Could not load your account role.");
        const account = await response.json();
        if (active) setUserRole(account.role);
      } catch (error) {
        console.error("Account role error:", error);
        if (active) setUserRole(null);
      } finally {
        if (active) setLoading(false);
      }
    });
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    userRole,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
