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
    goal_type: "weight_loss" | "workout_per_week";
    target_value: number;
    current_progress: number;
    start_date: string;
    end_date: string | null;
    status: "pending" | "complete" | "incomplete";
  }


  export interface FitnessContextProps {
    fitnessGoals: FitnessGoal[];
    loading: boolean;
    error: string | null;
    fetchFitnessGoals: () => void;
    addFitnessGoal: any;
    editFitnessGoal: any;
    removeFitnessGoal:any;
    fetchSingleFitnessGoal: any;
    id: number | null;
    setId: any;
    formData: any;
    setFormData:any;
  }

  export interface FitnessCardProps {
    goal: FitnessGoal;
    onDelete: (goalId: any) => void;
  }