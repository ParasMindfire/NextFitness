import { Metadata } from "next";
import GoalList from "./GoalList"; // Import your Goal List component

export const metadata: Metadata = {
  title: "Goals - Your Website",
  description: "Track your progress and achieve your fitness goals.",
  keywords: "goal list, fitness, health tracking",
  openGraph: {
    title: "Goals - Your Website",
    description: "Track your progress and achieve your fitness goals.",
    url: "https://yourwebsite.com/goals",
    type: "website",
  },
};

export default function GoalListPage() {
  return <GoalList />;
}
