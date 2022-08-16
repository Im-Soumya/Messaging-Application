import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { MdOutlineMoreVert, MdInfoOutline } from "react-icons/md";

import { auth, db } from "../firebase";
import Message from "./Message";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const messagesRef = db
    .collection("chats")
    .doc(router.query.id)
    .collection("messages")
    .orderBy("timestamp", "asc");
  const [messagesSnapshot] = useCollection(messagesRef);

  console.log(messagesSnapshot);

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
    }
  };

  return (
    <div>
      <header className="sticky bg-white z-100 top-0 flex p-3 h-20 items-center border-b-1 border-b-indigo-600">
        <div className="overflow-hidden relative w-8 h-8 mr-3 bg-gray-100 rounded-full dark:bg-gray-300 cursor-pointer hover:bg-gray-400 focus:bg-indigo-200 duration-200">
          <svg
            className="absolute -left-1 w-10 h-10 text-gray-100"
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

        <div className=" ml-4 flex-1">
          <h1 className="mb-1 text-base font-semibold">Recipient Email</h1>
          <p className="text-sm text-gray-400">Last seen...</p>
        </div>

        <div>
          <button>
            <MdOutlineMoreVert />
          </button>
        </div>
      </header>

      <div className="">
        {showMessages()}
        {/* <EndOfMessages /> */}
      </div>
    </div>
  );
};

export default ChatScreen;
