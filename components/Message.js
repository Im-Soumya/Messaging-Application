import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  return (
    <div className="mb-1 pl-2 pt-2">
      <h1 className="bg-white flex w-fit pl-3 pr-10 pt-1 pb-5 relative rounded-md">
        {message.message}
        <p className="text-gray-400 text-xxs pr-1 absolute bottom-0 text-right right-0">
          {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
        </p>
      </h1>
    </div>
  );
};

export default Message;

// py-4 px-6 w-fit rounded-sm min-w-15 pb-1 relative text-left bg-white
