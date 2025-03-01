export interface Workout {
    workout_id: number;
    user_id: number;
    exercise_type: string;
    duration: number;
    calories_burned: number;
    workout_date: string;
  }

  export interface WorkoutContextProps {
    workouts: Workout[];
    loading: boolean;
    error: string | null;
    fetchWorkouts: () => void;
    formData: Workout | null;
    setFormData: (workout: Workout | null) => void;
    setId:any,
    id:any
  }

  export interface WorkoutCardProps {
    workout: Workout;
    onDelete: (goalId: any) => void;
  }

  export interface workoutByAll{
    name:string,
    excercise_type:string,
    duration:number,
    calories_burned:number,
    workout_date:string
  }
  