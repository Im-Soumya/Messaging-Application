import { BsBell, BsSearch } from "react-icons/bs";
import { BiMessageSquareDots } from "react-icons/bi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="flex justify-between items-center px-8 py-5 border-b-1 border-b-gray-900">
      <div className="flex items-center">
        <BiMessageSquareDots className="text-fuchsia-700 text-2xl mr-3" />
        <h1 className="text-white text-xl">Messaging</h1>
      </div>

      <div className="flex items-center justify-evenly">
        <div className="flex items-center justify-end mr-4">
          <input
            className="placeholder:text-silver-chalice bg-cetacean-blue-2 bg-opacity-85 outline-none w-2/3 py-2 indent-5 rounded-l-lg"
            type="text"
            placeholder="Search"
          />
          <div className="bg-cetacean-blue-2 py-3 pr-5 rounded-r-lg">
            <BsSearch className="text-white" />
          </div>
        </div>

        <button className="mr-4 p-2.5 rounded-full focus:bg-cetacean-blue-2 duration-75">
          <BsBell className="text-xl text-white cursor-pointer " />
        </button>

        {user ? (
          <div className="cursor-pointer" onClick={() => auth.signOut()}>
            <img className="w-8 h-8 rounded-full" src={user.photoURL} alt="" />
          </div>
        ) : (
          <div
            onClick={() => auth.signOut()}
            className="overflow-hidden relative w-8 h-8 bg-gray-100 rounded-full dark:bg-gray-300 cursor-pointer hover:bg-gray-400 focus:bg-indigo-200 duration-200"
          >
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
      </div>
    </div>
  );
};

export default Header;
