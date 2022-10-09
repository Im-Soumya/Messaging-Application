import React from "react";

const Error = () => {
  return (
    <div className="bg-gradient-to-br from-vampire-black via-cetacean-blue-1 to-cetacean-blue-2 text-silver-chalice h-screen flex flex-col justify-center items-center sm:hidden">
      <h2 className="text-gray-300 text-xl mb-5">Too small screen size.</h2>
      <h2 className="text-gray-300">
        Please switch to a{" "}
        <span className="text-cyan-400 font-semibold">desktop</span> or{" "}
        <span className="text-cyan-400 font-semibold">laptop</span> for a better
        use experience.
      </h2>
    </div>
  );
};

export default Error;
