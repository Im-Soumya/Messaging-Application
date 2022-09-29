const Loader = () => {
  return (
    // <div className="grid place-items-center h-screen text-4xl bg-gradient-to-br from-vampire-black via-cetacean-blue-1 to-cetacean-blue-2 text-silver-chalice font-semibold">
    //   Loading...
    // </div>

    <div className="grid place-items-center h-screen bg-gradient-to-br from-vampire-black via-cetacean-blue-1 to-cetacean-blue-2">
      <div className="flex">
        <h1 className="text-5xl font-semibold font-figtree tracking-wide">
          Loading
        </h1>
        <div className="flex ml-1 mt-7">
          <div className="circle animate-bounce"></div>
          <div className="circle animate-bounce animation-delay-200"></div>
          <div className="circle animate-bounce animation-delay-400"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
