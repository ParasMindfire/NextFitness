"use client";

import { useGoalStore } from "../../store/useGoalStore";
import { useRouter } from "next/navigation";
import { UPDATE_GOAL, ADD_GOAL } from "../../../constants/constants";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useSWR from "swr";  // Import SWR
import { createFitnessGoal, updateFitnessGoal, getAllFitnessGoals } from "@/services/GoalAPI";
import { showToast } from "@/utils/Toast";

interface FitnessFormData {
  goal_type: string;
  target_value: number;
  current_progress: number;
  start_date: string;
  end_date: string;
  status: string;
}

// SWR Fetcher Function
const fetcher = async (url: string, token: string) => {
  if (!token) return null;
  const data = await getAllFitnessGoals(token);
  return data;
};

const FitnessFormPage = () => {
  const { id, setId, formGoalData, setFormGoalData } = useGoalStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FitnessFormData>({
    defaultValues: {
      goal_type: "weight_loss",
      target_value: 0,
      current_progress: 0,
      start_date: "",
      end_date: "",
      status: "pending",
    },
  });

  // Get token from localStorage
  const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  // Fetch fitness goals using SWR
  const { data: goals, mutate } = useSWR(token ? ["/fitness-goals", token] : null, fetcher);

  useEffect(() => {
    if (formGoalData) {
      reset({
        goal_type: formGoalData.goal_type,
        target_value: formGoalData.target_value,
        current_progress: formGoalData.current_progress,
        start_date: formGoalData.start_date,
        end_date: formGoalData.end_date || "",
        status: formGoalData.status || "pending",
      });
    }
  }, [formGoalData, reset]);

  const onSubmit = async (data: FitnessFormData) => {
    if (data.start_date && data.end_date && new Date(data.end_date) < new Date(data.start_date)) {
      console.log("End date cannot be less than start date");
      return;
    }

    if (!token) return;

    try {
      if (formGoalData) {
        await updateFitnessGoal(token, id, data);
        setId(null);
        showToast("Goal Edited Successfully", "success");
      } else {
        await createFitnessGoal(token, data);
        showToast("Goal Added Successfully", "success");
      }

      setFormGoalData(null);
      reset({
        goal_type: "weight_loss",
        target_value: 0,
        current_progress: 0,
        start_date: "",
        end_date: "",
        status: "pending",
      });

      // Revalidate the goals list after updating
      mutate();

      router.push("/goal-lists");
    } catch (error) {
      showToast("An error occurred. Please try again!", "error");
    }
  };

  const handleBack = () => {
    setFormGoalData(null);
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-[500px] mt-44">
      <form onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-2xl shadow-xl w-[500px] space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-center text-primary">
          {formGoalData ? "Edit Fitness Goal" : "Add Fitness Goal"}
        </h2>

        <div>
          <label htmlFor="goal_type" className="block text-secondary font-medium">
            Goal Type
          </label>
          <select
            id="goal_type"
            {...register("goal_type", { required: "Goal type is required" })}
            className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="weight_loss">WEIGHT LOSS</option>
            <option value="workout_per_week">Workout Per Week</option>
          </select>
          {errors.goal_type && <p className="text-error text-sm">{errors.goal_type.message}</p>}
        </div>

        <button type="submit" className="w-full bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-lg transition">
          {formGoalData ? UPDATE_GOAL : ADD_GOAL}
        </button>

        <Link href="/">
          <button onClick={handleBack} className="cursor-pointer w-full mt-4 bg-tertiary hover:bg-hover text-secondary font-bold py-2 rounded-lg transition duration-200">
            BACK TO DASHBOARD
          </button>
        </Link>
      </form>
    </div>
  );
};

export default FitnessFormPage;
