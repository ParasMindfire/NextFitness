import { Metadata } from "next";
import Login from "./Login"; // Import your Login component

export const metadata: Metadata = {
  title: "Login - Your Website",
  description: "Log in to access your account and manage your settings.",
  keywords: "login, authentication, user login, secure login",
  openGraph: {
    title: "Login - Your Website",
    description: "Log in to access your account and manage your settings.",
    url: "https://yourwebsite.com/login",
    type: "website",
  },
};

export default function LoginPage() {
  return <Login />;
}
