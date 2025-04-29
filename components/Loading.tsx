import React from "react";

const Loading: React.FC = () => {
  return (
    <div className=" flex justify-center">
      <div className="w-12 h-12 border-4 border-transparent border-t-pink-400 border-r-pink-300 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loading;
