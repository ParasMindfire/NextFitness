"use client";

import Image from "next/image";
import googleLogo from "@/public/google.png";
import githubLogo from "@/public/github.png";
import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-center h-14 px-6 mt-4 text-lg font-medium transition-all duration-300 bg-white border border-gray-300 text-gray-700 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      <Image src={googleLogo} alt="Google Logo" width={24} height={24} />
      <span className="ml-3">Sign in with Google</span>
    </button>
  );
}

// export function GithubSignInButton() {
//   const handleClick = () => {
//     signIn("github");
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="w-full flex items-center justify-center h-14 px-6 mt-4 text-lg font-medium transition-all duration-300 bg-gray-900 text-white rounded-lg shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-600"
//     >
//       <Image src={githubLogo} alt="Github Logo" width={24} height={24} />
//       <span className="ml-3">Sign in with GitHub</span>
//     </button>
//   );
// }

// export function CredentialsSignInButton() {
//   const handleClick = () => {
//     signIn();
//   };

//   return (
//     <button
//       onClick={handleClick}
//       className="w-full flex items-center justify-center h-14 px-6 mt-4 text-lg font-medium transition-all duration-300 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
//     >
//       <span className="ml-3">Sign in with Email</span>
//     </button>
//   );
// }
