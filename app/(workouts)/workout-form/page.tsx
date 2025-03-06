import { Metadata } from 'next';
import AddWorkout from './AddWorkout'; // Import your Add Workout component

export const metadata: Metadata = {
  title: 'Add Workout - FitnessTracker',
  description: 'Log your workouts and track your progress.',
  keywords: 'add workout, fitness tracking, exercise logging',
  openGraph: {
    title: 'Add Workout - Your Website',
    description: 'Log your workouts and track your progress.',
    url: 'https://fitness.com/workouts/add',
    type: 'website',
  },
};

export default function AddWorkoutPage() {
  return <AddWorkout />;
}
