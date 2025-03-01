import { Workout } from "../types";
import { create } from "zustand";
import { getUserWorkouts } from "../../services/WorkoutAPI";

interface WorkoutState {
  workouts: Workout[];
  loading: boolean;
  error: string | null;
  formData: Workout | null;
  id: number | null;
  setWorkouts: (workouts: Workout[]) => void;
  setFormData: (data: Workout | null) => void;
  setId: (id: number) => void;
  fetchWorkouts: () => Promise<void>;
  trigger:boolean;
  setTrigger:(flag:boolean)=>void;
}

const token:any=localStorage.getItem("accessToken");

export const useWorkoutStore = create<WorkoutState>((set) => ({
  workouts: [],
  loading: false,
  error: null,
  formData: null,
  id: null,
  setWorkouts: (workouts: Workout[]) => set({ workouts }),
  setFormData: (data: Workout | null) => set({ formData: data }),
  setId: (id: number) => set({ id }),

  fetchWorkouts: async () => {
    try {
      set({ loading: true, error: null });
      const data = await getUserWorkouts(token);
      set({ workouts: data, loading: false });
    } catch (error) {
      console.error("Error fetching workouts:", error);
      set({ error: "Failed to load workouts", loading: false });
    }
  },

  trigger:false,
  setTrigger: (flag: boolean) => set((state) => ({ trigger: !state.trigger }))

}));