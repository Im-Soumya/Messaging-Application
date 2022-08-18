import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { auth, db } from "../../firebase";

const Chat = ({ chat, messages }) => {
  // const [user] = useAuthState(auth)

  return (
    <div className="flex flex-col">
      <Head>
        <title>Chat</title>
      </Head>

      <Header />

      <div className="flex ml-4">
        <Sidebar />

        <div className="flex-1">
          <ChatScreen chat={chat} messages={messages} />
        </div>
      </div>
    </div>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  const messagesRef = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRef.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  const chatsRef = await ref.get();
  const chat = {
    id: chatsRef.id,
    ...chatsRef.data(),
  };

  // console.log(chat, messages);

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
