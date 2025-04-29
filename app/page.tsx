import NavBar from "./NavBar";
import Chatbox from "./Chatbox";

export default function HomePage() {
  return (
    <div className="flex flex-wrap flex-col mx-auto w-5/6 bg-gradient-to-r from-sky-100   to-emerald-200  h-screen rounded text-black">
      <NavBar />
      <h1 className="m-10 mx-auto  font-bold text-center text-2xl  p-2 inline-block flex-shrink-0 ">
        Chat with Me
      </h1>
      <Chatbox />
    </div>
  );
}
