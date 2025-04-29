"use client";

import { useState, useRef, useEffect } from "react";
import Loading from "@/components/Loading";
type ChatMessage = {
  sender: "user" | "assistant";
  content: string;
};

const delimiters = /[ \n]+/;

const LeftMessage = (chatMessage: ChatMessage) => {
  return (
    <div className="flex items-start mb-4">
      <div className="bg-blue-100 text-blue-800 p-2 rounded-lg max-w-xs">
        {chatMessage.content}
        <br />- {chatMessage.sender}
      </div>
    </div>
  );
};

const RightMessage = (chatMessage: ChatMessage) => {
  return (
    <div className="flex items-start mb-4 justify-end">
      <div className="bg-gray-100 text-gray-800 p-2 rounded-lg max-w-xs">
        {chatMessage.content}
      </div>
    </div>
  );
};

const postProcessResponse = (questionLength: number, response: string) => {
  const respArray = response
    .split(delimiters) //turn into array
    .slice(questionLength); // remove the question;
  const endOfRespIndex = respArray.findIndex(
    (word) => word.trim().toLowerCase() === "user:"
  ); // find the end of the response
  let output = "";
  if (endOfRespIndex === -1) {
    output = respArray.join(" "); // no next question
  } else {
    output = respArray.slice(0, endOfRespIndex).join(" "); // remove the next question
  }
  return output;
};

const firstMessage: ChatMessage = {
  sender: "assistant",
  content: "Hello! I'm your AI assistant. How can I help you today?"
};

// const loremIpsumMessages: ChatMessage[] = [
//   {
//     sender: "assistant",
//     content: "Hello! I'm your AI assistant. How can I help you today?"
//   },
//   { sender: "user", content: "Hi there!" },
//   { sender: "assistant", content: "Hi! How can I assist you today?" },
//   { sender: "user", content: "What can you do?" },
//   { sender: "user", content: "Hello, how are you?" },
//   {
//     sender: "assistant",
//     content: "I'm doing great! How can I assist you today?"
//   },
//   { sender: "user", content: "Can you tell me a joke?" },
//   {
//     sender: "assistant",
//     content:
//       "Sure! Why don't scientists trust atoms? Because they make up everything!"
//   },
//   { sender: "user", content: "That's funny! What's the weather like today?" },
//   {
//     sender: "assistant",
//     content: "It depends on your location. Can you tell me where you are?"
//   },
//   { sender: "user", content: "I'm in San Francisco." },
//   {
//     sender: "assistant",
//     content:
//       "It's usually mild and sunny in San Francisco. Don't forget a light jacket!"
//   },
//   { sender: "user", content: "Thanks! Can you recommend a good book?" },
//   {
//     sender: "assistant",
//     content:
//       "Sure! 'Atomic Habits' by James Clear is a great read for building good habits."
//   }
// ];

export default function Chatbox() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([firstMessage]);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = async () => {
    //Do nothing if input is empty
    if (input.trim() !== "") {
      scrollToBottom();
      //start the loading animation
      setLoading(true);
      //need to save it into database
      setMessages([...messages, { sender: "user", content: input }]);
      const data = {
        inputs: `user: ${input}\\nAssistant:`
      };

      try {
        const rawResp = await fetch(
          "https://54ogru7qte.execute-api.us-west-1.amazonaws.com/default/myTestFunction",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
        );
        //clean up response, might need to refactor into a different file.

        const jsonResp = await rawResp.json();
        //this could failed
        const bodyResp = JSON.parse(jsonResp.body);
        const first = bodyResp[0];
        const generatedText = first.generated_text;
        const finalOutput = postProcessResponse(
          data.inputs.split(delimiters).length,
          generatedText
        );

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "assistant", content: finalOutput }
        ]);
        console.log("Response:", generatedText);
      } catch (error) {
        console.log(`Error: ${error}`);
      } finally {
        //stop the loading animation
        setLoading(false);
        //clear the input box
        setInput("");
        scrollToBottom();
      }
    }
  };

  return (
    <div className="flex flex-col h-96 w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 p-4 overflow-y-auto" ref={messagesEndRef}>
        {messages.map((message, index) => {
          if (message.sender === "user") {
            return <RightMessage key={index} {...message} />;
          } else {
            return <LeftMessage key={index} {...message} />;
          }
        })}
        {loading && (
          <div className="fixed top-1/2 left-1/2 z-10">
            <Loading />
          </div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-gray-300">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleSend();
              }
            }}
            placeholder="Ask anything..."
            className={`flex-1 p-2 border  border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200 ${loading ? "bg-gray-400" : "bg-white"}`}
            disabled={loading} // Disable input when loading
          />
          <button
            onClick={handleSend}
            className={`ml-2 px-4 py-2  text-white rounded  ${loading ? "bg-gray-400 hover:cursor-crosshair hover:bg-gray-400" : "bg-blue-500 hover:bg-blue-600 hover:cursor-pointer"}`}
            disabled={loading} // Disable button when loading
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
