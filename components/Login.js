import Head from "next/head";
import { useEffect } from "react";
import { FaGoogle } from "react-icons/fa";
import { auth, provider, db } from "../firebase";
import firebase from "firebase/compat/app";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch(alert);
  };

  return (
    <div className="grid place-items-center h-screen bg-gray-200">
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex flex-col items-center p-24 bg-white rounded-lg shadow-sm">
        <img
          className=" w-24 h-24 mb-10"
          src="https://www.stickpng.com/img/download/580b57fcd9996e24bc43c543/image"
          alt="logo"
        />
        <button
          onClick={signIn}
          className="bg-teal-600 flex justify-center items-center py-2 px-4 rounded-lg text-xl font-semibold hover:bg-teal-700 duration-150"
        >
          Login{" "}
          <span className="ml-2">
            <FaGoogle />
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
