import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { getRecipientEmail } from "../lib/getRecipientEmail";
import { getRecipientName } from "../lib/getRecipientName";

const Chat = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);

  const usersRef = db
    .collection("users")
    .where("email", "==", getRecipientEmail(users, user));
  const [userSnapshot] = useCollection(usersRef);

  const recipient = userSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);
  console.log(recipientEmail);

  const recipientName = getRecipientName(users, user);
  // console.log(recipientName);
  const startChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <div
      onClick={startChat}
      className="flex items-center py-3 px-3 rounded-md cursor-pointer hover:bg-gray-200 duration-150"
    >
      {recipient ? (
        <div className="mr-3">
          <img
            className="w-8 h-8 rounded-full"
            src={recipient.photoURL}
            alt=""
          />
        </div>
      ) : (
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
      )}
      <p>{recipientEmail}</p>
    </div>
  );
};

export default Chat;
