"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useWorkoutStore } from "../app/store/useWorkoutStore";
import { createWorkout, updateWorkout, getUserWorkouts } from "../services/WorkoutAPI";
import { useRouter } from "next/navigation";
import { showToast } from "@/utils/Toast";
import FormField from "@/components/FormField";

interface WorkoutFormData {
  exercise_type: string;
  duration: number;
  calories_burned: number;
  workout_date: string;
}

const WorkoutForm: React.FC = () => {
  const { formData, setFormData, id } = useWorkoutStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkoutFormData>({
    defaultValues: {
      exercise_type: "",
      duration: undefined,
      calories_burned: undefined,
      workout_date: "",
    },
  });

  useEffect(() => {
    if (formData) {
      reset({
        exercise_type: formData.exercise_type,
        duration: formData.duration,
        calories_burned: formData.calories_burned,
        workout_date: formData.workout_date,
      });
    }
  }, [formData, reset]);

  const onSubmit = async (data: WorkoutFormData) => {
    if (data.duration <= 0) {
      showToast("Duration must be greater than 0", "error");
      return;
    }
    if (data.calories_burned <= 0) {
      showToast("Calories burned must be greater than 0", "error");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      if (formData) {
        await updateWorkout(token, {
          ...data,
          workout_id: id,
        });
        showToast("Workout Updated Successfully", "success");
      } else {
        await createWorkout(token, data);
        showToast("Workout Added Successfully", "success");
      }

      setFormData(null);
      reset({
        exercise_type: "",
        duration: undefined,
        calories_burned: undefined,
        workout_date: "",
      });
      router.push("/workout-lists");
      getUserWorkouts(token);

    } catch (error) {
      showToast("An error occurred. Please try again!", "error");
    }
  };

  const handleBack = () => {
    setFormData(null);
    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-tertiary space-y-3"
      aria-labelledby="workoutFormTitle"
    >
      <h2 id="workoutFormTitle" className="text-xl font-semibold text-primary text-center mb-4">
        {formData ? "EDIT WORKOUT" : "ADD WORKOUT"}
      </h2>

      <FormField
        label="EXERCISE TYPE"
        id="exercise_type"
        register={register}
        errors={errors}
        type="select"
        validation={{ required: "Exercise type is required" }}
        options={[
          { value: "", label: "Select exercise type" },
          { value: "chest", label: "Chest" },
          { value: "back", label: "Back" },
          { value: "legs", label: "Legs" },
          { value: "shoulders", label: "Shoulders" },
          { value: "arms", label: "Arms" },
          { value: "cardio", label: "Cardio" },
          { value: "abs", label: "Abs" },
        ]}
      />

      <FormField
        label="DURATION"
        id="duration"
        register={register}
        errors={errors}
        type="number"
        placeholder="0"
        validation={{
          required: "Duration is required",
          min: { value: 1, message: "Duration must be greater than 0" },
        }}
      />

      <FormField
        label="CALORIES BURNED"
        id="calories_burned"
        register={register}
        errors={errors}
        type="number"
        placeholder="0"
        validation={{
          required: "Calories burned is required",
          min: { value: 1, message: "Calories burned must be greater than 0" },
        }}
      />

      <FormField
        label="WORKOUT DATE"
        id="workout_date"
        register={register}
        errors={errors}
        type="date"
        validation={{ required: "Workout date is required" }}
      />

      <button
        type="submit"
        className="cursor-pointer mt-5 w-full bg-primary hover:bg-hover text-white text-lg font-medium py-3 rounded-md transition-all"
        aria-label={formData ? "Update workout" : "Add workout"}
      >
        {formData ? "UPDATE WORKOUT" : "ADD WORKOUT"}
      </button>

      <button
        type="button"
        onClick={handleBack}
        className="cursor-pointer w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition duration-200"
        aria-label="Back to dashboard"
      >
        BACK TO DASHBOARD
      </button>
    </form>
  );
};

export default WorkoutForm;
