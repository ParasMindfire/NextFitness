"use client";

import { useRouter } from "next/navigation";
import { useWorkoutStore } from "../app/store/useWorkoutStore";
import { WorkoutCardProps } from "../app/types";
import {
  DURATION_LABEL,
  CALORIES_LABEL,
  DATE_LABEL,
  EDIT,
  DELETE
} from "../constants/constants";

export const WorkoutCard = ({ workout, onDelete }: WorkoutCardProps) => {
  const { setFormData, setId } = useWorkoutStore();
  const router = useRouter();

  // Handle edit button click
  const handleEdit = (id: any) => {
    setFormData(workout);
    router.push("/workout-form");
    setId(id);
  };

  return (
    <div className="bg-primary rounded-2xl shadow-xl p-8 w-full text-white transition-transform transform hover:scale-105 hover:shadow-2xl">
      {/* Workout type title */}
      <h2 className="text-2xl font-bold uppercase text-center mb-4">{workout.exercise_type}</h2>

      {/* Workout details */}
      <div className="space-y-3 text-white text-sm">
        <p><span className="font-semibold text-white">{DURATION_LABEL}</span> {workout.duration} mins</p>
        <p><span className="font-semibold text-white">{CALORIES_LABEL}</span> {workout.calories_burned} kcal</p>
        <p><span className="font-semibold text-white">{DATE_LABEL}</span> {new Date(workout.workout_date).toLocaleDateString()}</p>
      </div>

      {/* Edit and delete buttons */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={() => handleEdit(workout.workout_id)}
          className="cursor-pointer bg-secondary text-white text-sm font-medium px-5 py-2 rounded-lg transition-all hover:bg-hover"
        >
          {EDIT}
        </button>

        <button
          onClick={() => onDelete(workout.workout_id)}
          className="cursor-pointer bg-secondary text-white text-sm font-medium px-5 py-2 rounded-lg transition-all hover:bg-hover"
        >
          {DELETE}
        </button>
      </div>
    </div>
  );
};
