import { FitnessGoal } from '../types';
import { create } from 'zustand';
import { getAllFitnessGoals } from '../../services/GoalAPI';

interface FitnessGoalState {
  fitnessGoals: FitnessGoal[];
  loading: boolean;
  error: string | null;
  formGoalData: FitnessGoal | null;
  id: number | null;
  setFitnessGoals: (goals: FitnessGoal[]) => void;
  setFormGoalData: (data: FitnessGoal | null) => void;
  setId: (id: number | null) => void;
  fetchFitnessGoals: (token: any) => Promise<void>;
  trigger: boolean;
  setTrigger: (flag: boolean) => void;
}

// const token: any = localStorage.getItem("accessToken");

export const useGoalStore = create<FitnessGoalState>((set) => ({
  fitnessGoals: [],
  loading: false,
  error: null,
  formGoalData: null,
  id: null,
  setFitnessGoals: (goals: FitnessGoal[]) => set({ fitnessGoals: goals }),
  setFormGoalData: (data: FitnessGoal | null) => set({ formGoalData: data }),
  setId: (id: number | null) => set({ id }),

  fetchFitnessGoals: async (token: any) => {
    try {
      set({ loading: true, error: null });
      const data = await getAllFitnessGoals(token);
      set({ fitnessGoals: data, loading: false });
    } catch (error) {
      console.error('Error fetching fitness goals:', error);
      set({ error: 'Failed to load fitness goals', loading: false });
    }
  },

  trigger: false,
  setTrigger: (flag: boolean) => set((state) => ({ trigger: !state.trigger })),
}));
