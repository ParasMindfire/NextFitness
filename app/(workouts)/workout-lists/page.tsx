import { Metadata } from "next";
import WorkoutList from "./WorkoutList"; // Import your Workout List component

export const metadata: Metadata = {
  title: "Workouts - Your Website",
  description: "View and manage your past workouts.",
  keywords: "workout list, fitness, exercise history",
  openGraph: {
    title: "Workouts - Your Website",
    description: "View and manage your past workouts.",
    url: "https://yourwebsite.com/workouts",
    type: "website",
  },
};

export default function WorkoutListPage() {
  return <WorkoutList />;
}
