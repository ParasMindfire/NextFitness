import { Metadata } from "next";
import Landing from "./Landing"; // Import the Landing component

export const metadata: Metadata = {
  title: "Welcome to Your Website",
  description: "Explore our platform and get started today!",
  keywords: "home, landing page, welcome, explore, features",
  openGraph: {
    title: "Welcome to Your Website",
    description: "Explore our platform and get started today!",
    url: "https://yourwebsite.com/",
    type: "website",
  },
};

export default function LandingPage() {
  return <Landing />;
}
