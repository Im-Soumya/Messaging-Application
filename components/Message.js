import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const sender = () => {
    return (
      <h1 className="bg-deep-violet text-white flex w-fit pl-3 pr-10 pt-1 pb-5 ml-auto relative rounded-md">
        {message.message}
        <p className="text-gray-200 text-xxs pr-1 absolute bottom-0 text-right right-0">
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </p>
      </h1>
    );
  };

  const receiver = () => {
    return (
      <h1 className="flex w-fit pl-3 pr-10 pt-1 pb-5 bg-weird-blue text-left text-silver-chalice relative rounded-md">
        {message.message}
        <p className="text-xxs pr-1 absolute bottom-0 text-right text-zinc-500 right-0">
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </p>
      </h1>
    );
  };

  return (
    <div className="mb-3 px-6">
      {user === userLoggedIn.email ? sender() : receiver()}
    </div>
  );
};

export default Message;

// py-4 px-6 w-fit rounded-sm min-w-15 pb-1 relative text-left bg-white
