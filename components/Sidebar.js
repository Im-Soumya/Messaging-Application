import { useState } from "react";
import { RiChatNewLine } from "react-icons/ri";
import { MdOutlineMoreVert } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import * as EmailValidator from "email-validator";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  DrawerFooter,
} from "@chakra-ui/react";

import { auth, db } from "../firebase";
import Contact from "./Contact";
import "./Sidebar.module.css";

const Sidebar = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const [user] = useAuthState(auth);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const chatsRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatSnapshot] = useCollection(chatsRef);

  const createChat = () => {
    if (!username && !email) return;

    if (
      EmailValidator.validate(email) &&
      !checkEmailExists(email) &&
      email !== user.email
    ) {
      db.collection("chats").add({
        users: [user.email, email, username],
      });
    }

    onClose();
  };

  const checkEmailExists = (recipientEmail) => {
    !!chatSnapshot?.docs.find((chat) => {
      chat.data().users.find((user) => {
        user === recipientEmail;
      })?.length > 0;
    });
  };

  return (
    <>
      <div className="h-89 min-w-300 max-w-350 overflow-y-hidden border-r-1 border-r-gray-900">
        <div className="flex justify-between items-center h-14 sticky top-0 z-1 mx-2">
          <h1 className="text-white pl-4 text-base font-semibold">Chats</h1>

          <div className="flex items-center">
            <button
              onClick={onOpen}
              className="text-purple-400 p-2.5 mr-2 rounded-full"
            >
              <RiChatNewLine className="text-xl" />
            </button>

            <button className="p-1 focus:bg-cetacean-blue-2 rounded-full">
              <MdOutlineMoreVert className="text-purple-400 text-2xl" />
            </button>
          </div>
        </div>

        <div>
          {chatSnapshot?.docs.map((chat) => (
            <Contact key={chat.id} id={chat.id} users={chat.data().users} />
          ))}
        </div>
      </div>

      <Drawer
        colorScheme="black"
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
      >
        <DrawerOverlay />

        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize="1.3rem" borderBottomWidth="1px">
            Add Contact
          </DrawerHeader>

          <DrawerBody>
            <form onSubmit={createChat}>
              <div className="mb-7">
                <h1
                  className="text-lg mb-2 font-semibold tracking-wide"
                  htmlFor="username"
                >
                  Name
                </h1>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Please enter user name"
                  className="placeholder:text-base border-1 border-indigo-300 py-2 indent-3 w-full rounded-md focus:outline-blue-500"
                />
              </div>

              <div>
                <h1
                  className="text-lg mb-2 font-semibold tracking-wide"
                  htmlFor="username"
                >
                  Email
                </h1>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Please enter user mail"
                  className="placeholder:text-base border-1 border-indigo-300 py-2 indent-3 w-full rounded-md focus:outline-blue-500"
                />
              </div>

              <button type="submit" className="hidden">
                Submit
              </button>
            </form>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button onClick={onClose} colorScheme="red" padding="0 2.5rem">
              Cancel
            </Button>
            <Button
              onClick={createChat}
              className="ml-3 border-2 border-indigo-200"
            >
              Save Contact
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
