import Head from "next/head";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen";
import { db } from "../../firebase";

const Chat = ({ chat, messages }) => {
  return (
    <div className="overflow-y-hidden flex flex-col bg-gradient-to-br from-vampire-black via-cetacean-blue-1 to-cetacean-blue-2">
      <Head>
        <title>Chat</title>
      </Head>

      <Header />

      <div className="flex">
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
