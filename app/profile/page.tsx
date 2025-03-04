import { Metadata } from "next";
import Profile from "./Profile"; // Import your Profile component

export const metadata: Metadata = {
  title: "Profile - Your Website",
  description: "Manage your account details and preferences.",
  keywords: "profile, user settings, account management",
  openGraph: {
    title: "Profile - Your Website",
    description: "Manage your account details and preferences.",
    url: "https://yourwebsite.com/profile",
    type: "website",
  },
};

export default function ProfilePage() {
  return <Profile />;
}
