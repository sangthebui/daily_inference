"use client";
import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { invokeSageMakerEndpoint } from "@/util/sagemaker";

import NavBar from "./NavBar";
import Chatbox from "./Chatbox";

export default function HomePage() {
  const { signOut, user } = useAuthenticator();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handlePredict() {
    setLoading(true);
    try {
      const inputData = {
        inputs: "User: Who is the current president?\nAssistant:",
        parameters: {
          max_new_tokens: 50, //# Maximum number of tokens to generate
          do_sample: true, //# Whether to use sampling; set to False for deterministic output
          temperature: 0.7, //# Controls randomness (higher is more random)
          top_p: 0.95, //# Nucleus sampling (top-p); consider with temperature
          top_k: 50, //# Top-k sampling
          repetition_penalty: 1.0, // # Penalize repeated tokens
          //# Add other generation parameters as needed
        },
      };

      const prediction = await invokeSageMakerEndpoint(inputData);
      setResult(prediction);
    } catch (error) {
      console.error("Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap flex-col mx-auto w-5/6 bg-gradient-to-r from-sky-100   to-emerald-200  h-screen rounded text-black">
      <NavBar />
      <h1 className="m-10 mx-auto text-center border border-gray-500 border-solid rounded text-xl  p-2 inline-block flex-shrink-0 ">
        {user?.signInDetails?.loginId}'s Chat AI
      </h1>
      <button
        className="border border-gray-500 border-solid rounded flex-shrink-0 m-10 mx-auto text-center text-2xl font-bold p-2"
        onClick={handlePredict}
        disabled={loading}
      >
        {loading ? "Processing..." : "Get Prediction"}
      </button>
      {result && (
        <div>
          <h3 className="border border-gray-500 border-solid rounded ">
            Prediction Result:
          </h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <Chatbox />
      <button
        className="border bg-red-300 border-white border-solid rounded flex-shrink-0 m-10 mx-auto text-center text-2xl font-bold p-2 hover:cursor-pointer hover:bg-yellow-300"
        onClick={signOut}
      >
        Sign out
      </button>
    </div>
  );
}
