import { BsFillChatLeftTextFill } from "react-icons/bs";
import { RiChatNewLine } from "react-icons/ri";
import { MdOutlineMoreVert } from "react-icons/md";
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import Chat from "./Chat";

const Sidebar = () => {
  const [user] = useAuthState(auth);

  const chatsRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(chatsRef);

  const createChat = () => {
    const input = window.prompt(
      "Please enter an email of the user you want to chat with..."
    );

    if (!input) return;

    if (
      EmailValidator.validate(input) &&
      !checkEmailExists(input) &&
      input !== user.email
    ) {
      //Add the contact/chat to database
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const checkEmailExists = (recipientEmail) => {
    !!chatSnapshot?.docs.find((chat) => {
      chat.data().users.find((user) => {
        user === recipientEmail;
      })?.length > 0;
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center h-14 sticky top-0 bg-white z-1 ml-2">
        <h1 className="text-lg font-semibold">Chats</h1>

        <div className="flex items-center">
          <button
            onClick={createChat}
            className=" p-2.5 mr-2 rounded-full focus:bg-indigo-200 duration-200"
          >
            <RiChatNewLine className="text-xl" />
          </button>

          <button className=" p-1.5 rounded-full focus:bg-indigo-200 duration-200">
            <MdOutlineMoreVert className="text-2xl " />
          </button>
        </div>
      </div>

      <div>
        {chatSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
