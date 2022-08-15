import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "firebase/compat/app";
import { auth, db } from "../firebase";
import Login from "../components/Login";
import Loader from "../components/Loader";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      console.log(user.displayName);
    }
  }, [user]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
