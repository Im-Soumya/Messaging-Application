import { BsFillChatLeftTextFill, BsSearch } from "react-icons/bs";
import { MdOutlineMoreVert } from "react-icons/md";

const Sidebar = () => {
  return (
    <div>
      <div className="flex justify-between item-center h-20 py-5 sticky top-0 bg-white z-1 ">
        <div className="overflow-hidden relative w-10 h-10 bg-gray-100 rounded-full dark:bg-gray-400">
          <svg
            className="absolute -left-1 w-12 h-12 text-gray-200"
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

        <div className="flex items-center">
          <button className=" p-2.5 mr-2 rounded-full focus:bg-indigo-200 duration-200">
            <BsFillChatLeftTextFill className="text-lg" />
          </button>

          <button className=" p-1.5 rounded-full focus:bg-indigo-200 duration-200">
            <MdOutlineMoreVert className="text-2xl " />
          </button>
        </div>
      </div>

      <div className="flex items-center py-3 mb-2">
        <div className="border-2 border-indigo-200 p-3 rounded-l-lg">
          <BsSearch className="" />
        </div>
        <input
          className="outline-none w-full py-2 indent-3 border-2 border-l-0 rounded-r-lg border-indigo-200 flex-1"
          type="text"
          placeholder="Search in chats"
        />
      </div>

      <button className="w-full bg-indigo-200 py-2.5 mb-3 rounded-lg hover:bg-indigo-300 duration-150">
        Start a new chat
      </button>
    </div>
  );
};

export default Sidebar;
