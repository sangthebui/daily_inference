"use client";
import { useState } from "react";
import { useAuthenticator } from "@aws-amplify/ui-react";
import { invokeSageMakerEndpoint } from "@/util/sagemaker";

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
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{user?.signInDetails?.loginId}'s Chat AI</h1>
      <button onClick={handlePredict} disabled={loading}>
        {loading ? "Processing..." : "Get Prediction"}
      </button>
      {result && (
        <div>
          <h3>Prediction Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
