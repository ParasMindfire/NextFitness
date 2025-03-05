"use client"


import { useGoalStore } from "../../store/useGoalStore";
// import { showToast } from "../../helpers/ToastHelper";
import { useRouter } from "next/navigation";
import {
  UPDATE_GOAL,
  ADD_GOAL,
} from "../../../constants/constants";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { createFitnessGoal, getAllFitnessGoals, updateFitnessGoal } from "@/services/GoalAPI";
import { showToast } from "@/utils/Toast";

interface FitnessFormData {
  goal_type: string;
  target_value: number;
  current_progress: number;
  start_date: string;
  end_date: string;
  status: string;
}

const FitnessFormPage = () => {
    const {
      id,
      setId,
      formGoalData,
      setFormGoalData
    } = useGoalStore();

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
      // showToast("End date cannot be less than start date", "error");
      console.log("start end cannot");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      if (formGoalData) {
        await updateFitnessGoal(token,id,data);
        setId(null);
        showToast("Goal Edited Successfully", "success");
      } else {
        await createFitnessGoal(token,data);
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
      router.push("/goal-lists");
      getAllFitnessGoals(token);
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
          {/* Add Fitness Goals */}
        </h2>

        <div>
          <label
            htmlFor="goal_type"
            className="block text-secondary font-medium"
          >
            {/* {GOAL_TYPE} */}
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

        <div>
          <label
            htmlFor="target_value"
            className="block text-secondary font-medium"
          >
            TARGET VALUE
          </label>
          <input
            type="number"
            id="target_value"
            placeholder="0"
            {...register("target_value", {
              required: "Target value is required",
              validate: (value) => Number(value) > 0 || "Target value must be greater than 0",
            })}
            className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
          />
          {errors.target_value && <p className="text-error text-sm">{errors.target_value.message}</p>}
        </div>

        <div>
          <label
            htmlFor="current_progress"
            className="block text-secondary font-medium"
          >
            {/* {CURRENT_PROGRESS} */}
            CURRENT PROGRESS
          </label>
          <input
            type="number"
            id="current_progress"
            placeholder="0"
            {...register("current_progress", {
              required: "Current progress is required",
              valueAsNumber: true,
              validate: (value) => value > 0 || "Current progress must be greater than 0",
            })}
            className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
          />
          {errors.current_progress && <p className="text-error text-sm">{errors.current_progress.message}</p>}
        </div>

        <div>
          <label
            htmlFor="start_date"
            className="block text-secondary font-medium"
          >
            {/* {START_DATE} */}
            START DATE
          </label>
          <input
            type="date"
            id="start_date"
            {...register("start_date", { required: "Start date is required" })}
            className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
          />
          {errors.start_date && <p className="text-error text-sm">{errors.start_date.message}</p>}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-secondary font-medium">
            {/* {END_DATA} */}
            END DATE
          </label>
          <input
            type="date"
            id="end_date"
            {...register("end_date", {
              required: "End date is required",
              validate: (value) => {
                const startDate = watch("start_date");
                if (startDate && new Date(value) < new Date(startDate)) {
                  return "End date cannot be less than start date";
                }
                return true;
              },
            })}
            className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
          />
          {errors.end_date && <p className="text-error text-sm">{errors.end_date.message}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-secondary font-medium">
            {/* {STATUS} */}
            STATUS
          </label>
          <select
            id="status"
            {...register("status", { required: "Status is required" })}
            className="w-full p-2 border border-tertiary rounded-lg focus:ring-2 focus:ring-primary"
          >
            <option value="pending">PENDING</option>
            <option value="complete">COMPLETE</option>
            <option value="incomplete">INCOMPLETE</option>
          </select>
          {errors.status && <p className="text-error text-sm">{errors.status.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          {formGoalData ? UPDATE_GOAL : ADD_GOAL}
        </button>

        <Link href="/">
          <button
            onClick={handleBack}
            className="cursor-pointer w-full mt-4 bg-tertiary hover:bg-hover text-secondary font-bold py-2 rounded-lg transition duration-200"
          >
            BACK TO DASHBOARD
          </button>
        </Link>
      </form>
    </div>
  );
};

export default FitnessFormPage;
