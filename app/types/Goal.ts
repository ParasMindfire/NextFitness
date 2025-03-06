export interface Fitness {
  fitness_id: string;
  activity_type: string;
  duration: number;
  calories_burned: number;
  fitness_date: string;
}

export interface FitnessGoal {
  goal_id: number;
  user_id: number;
  goal_type: 'weight_loss' | 'workout_per_week';
  target_value: number;
  current_progress: number;
  start_date: string;
  end_date: string | null;
  status: 'pending' | 'complete' | 'incomplete';
}

export interface FitnessCardProps {
  goal: FitnessGoal;
  onDelete: (goalId: number) => void;
}
