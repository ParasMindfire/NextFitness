import { Metadata } from 'next';
import AddGoal from './AddGoal'; // Import your Add Goal component

export const metadata: Metadata = {
  title: 'Add Goal - FitnessTracker',
  description: 'Set and track your fitness goals.',
  keywords: 'add goal, fitness goals, health tracking',
  openGraph: {
    title: 'Add Goal - Your Website',
    description: 'Set and track your fitness goals.',
    url: 'https://fitness.com/goals/add',
    type: 'website',
  },
};

export default function AddGoalPage() {
  return <AddGoal />;
}
