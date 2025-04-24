"use client";
import { useAuthenticator } from "@aws-amplify/ui-react";

export default function HomePage() {
  const { signOut, user } = useAuthenticator();

  return (
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>{user?.signInDetails?.loginId}'s Chat AI</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
