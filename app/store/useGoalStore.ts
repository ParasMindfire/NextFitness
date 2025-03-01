import { FitnessGoal } from "../types";
import {create} from "zustand";

interface FitnessGoalState {
    fitnessGoals: FitnessGoal[];
    loading: boolean;
    error: string | null;
  }
  
  export const useFitnessGoalStore = create<FitnessGoalState>((set) => ({
    fitnessGoals: [],
    loading: false,
    error: null,
  }));
  