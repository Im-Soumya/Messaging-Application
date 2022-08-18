import { useRef, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdOutlineMoreVert } from "react-icons/md";
import { BiMicrophone } from "react-icons/bi";
import TimeAgo from "timeago-react";

import { auth, db } from "../firebase";
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
    .where("email", "==", chat.users[1]);
  const [recipientSnapshot] = useCollection(recipientRef);
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  const recipientName = chat.users[2];

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => (
        <Message
          key={message.id}
          user={message.data().user}
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
  };

  const scrollToBottom = () => {
    endOfMessagesRef.current.scrollIntoView({
      behaviour: "smooth",
      block: "start",
    });
  };

  return (
    <div>
      <header className="sticky bg-white z-100 top-0 flex p-3 h-14 items-center border-b-1 border-b-indigo-600">
        {recipient ? (
          <img src={recipient.photoURL} className="w-9 h-9 rounded-full" />
        ) : (
          <div className="overflow-hidden relative w-9 h-9 mr-3 bg-gray-100 rounded-full dark:bg-gray-300 cursor-pointer hover:bg-gray-400 focus:bg-indigo-200 duration-200">
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

        <div className=" ml-2 flex-1">
          <h1 className="text-sm font-semibold">
            {recipient ? recipient?.name : recipientName}
          </h1>
          {recipient ? (
            recipient?.lastSeen?.toDate() ? (
              <TimeAgo datetime={recipient.lastSeen.toDate()} />
            ) : (
              <p>Last seen status not available</p>
            )
          ) : (
            <p></p>
          )}
        </div>

        <div>
          <button className="p-1.5 rounded-full text-xl focus:bg-indigo-200 duration-200">
            <MdOutlineMoreVert />
          </button>
        </div>
      </header>

      <div className="bg-amber-100 min-h-68">
        {showMessages()}
        <div ref={endOfMessagesRef}></div>
      </div>

      <form className="bottom-0 sticky flex items-center p-2 bg-white z-100">
        <input
          className="flex-1 outline-none border-none rounded-md items-center p-2 sticky bottom-0 bg-gray-300 z-100"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type something..."
        />
        <button
          disabled={!input}
          type="submit"
          className="hidden"
          onClick={sendMessage}
        >
          Send
        </button>
        <button>
          <BiMicrophone />
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
