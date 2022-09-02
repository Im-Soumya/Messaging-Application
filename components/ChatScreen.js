import { useRef, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/compat/app";
import TimeAgo from "timeago-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdOutlineMoreVert } from "react-icons/md";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BiMicrophone } from "react-icons/bi";
import { MdOutlineAttachFile } from "react-icons/md";

import { auth, db } from "../firebase";
import { getRecipientEmail } from "../lib/getRecipientEmail";
import Message from "./Message";

const ChatScreen = ({ chat, messages }) => {
  const [input, setInput] = useState("");

  const endOfMessagesRef = useRef(null);

  const [user] = useAuthState(auth);
  const router = useRouter();

  const messagesRef = db
    .collection("chats")
    .doc(router.query.id)
    .collection("messages")
    .orderBy("timestamp", "asc");
  const [messagesSnapshot] = useCollection(messagesRef);

  const recipientRef = db
    .collection("users")
    .where("email", "==", getRecipientEmail(chat.users, user));
  const [recipientSnapshot] = useCollection(recipientRef);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientName = chat.users[2];

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().email}
          message={{
            ...message.data(),
            timestamp: message.data().timestamp?.toDate().getTime(),
          }}
        />
      ));
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    if (input) {
      db.collection("users").doc(user.uid).set(
        {
          lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      db.collection("chats").doc(router.query.id).collection("messages").add({
        message: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        email: user.email,
        name: user.displayName,
        photoURL: user.photoURL,
      });

      setInput("");
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <header className="sticky z-100 top-0 flex p-3 h-16 items-center text-silver-chalice">
        {recipient ? (
          <img src={recipient.photoURL} className="ml-3 w-9 h-9 rounded-full" />
        ) : (
          <div className="overflow-hidden relative w-9 h-9 ml-3  bg-gray-100 rounded-full dark:bg-gray-300 cursor-pointer hover:bg-gray-400 focus:bg-indigo-200 duration-200">
            <svg
              className="absolute -left-1 w-11 h-11 text-gray-100"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        )}

        <div className="ml-3 flex-1 flex flex-col justify-center">
          <h1 className="text-gray-300 text-base pt-2 pb-0 font-semibold">
            {recipient ? recipient?.name : recipientName}
          </h1>
          {recipient ? (
            recipient?.lastSeen?.toDate() ? (
              <TimeAgo
                className="text-xs pb-3"
                datetime={recipient.lastSeen.toDate()}
              />
            ) : (
              <p className="text-xs">Last seen status not available</p>
            )
          ) : (
            <p></p>
          )}
        </div>

        <div>
          <button className="p-1 rounded-full text-2xl focus:bg-cetacean-blue-2 duration-200">
            <MdOutlineMoreVert />
          </button>
        </div>
      </header>

      <div className="min-h-66 mb-2.5 mt-3">
        {showMessages()}
        <div ref={endOfMessagesRef}></div>
      </div>

      <div className="bottom-0 sticky w-full flex items-center -ml-0.1 pb-3 border-l-1 border-l-gray-900 z-100 focus:bg-cetacean-blue-1">
        <button className="p-2 ml-1 text-xl text-gray-500 rounded-full hover:text-gray-300 focus:bg-cetacean-blue-1">
          <MdOutlineAttachFile />
        </button>

        <button className="p-2 mr-2 text-xl text-gray-500 rounded-full hover:text-gray-300 focus:bg-cetacean-blue-1">
          <BiMicrophone />
        </button>
        <form className="w-full flex">
          <input
            className="w-full placeholder:text-gray-600 flex-1 indent-4 bg-transparent outline-none text-silver-chalice border-1 border-gray-800 rounded-md items-center p-2 sticky bottom-0 z-100 focus:border-gray-400"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a message"
          />

          <button
            disabled={!input}
            type="submit"
            className="hidden"
            onClick={sendMessage}
          >
            Send
          </button>

          <button className="p-2 rounded-full mx-2">
            <RiSendPlane2Fill className="text-fuchsia-400 text-2xl " />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatScreen;
