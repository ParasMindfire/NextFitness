"use client";

import { useGoalStore } from "../app/store/useGoalStore";
import { useRouter } from "next/navigation";
import { FitnessCardProps } from "../app/types/Goal";
import {
  TARGET,
  PROGRESS,
  START,
  END,
  PERCENT_ACHIEVED,
  EDIT,
  DELETE
} from "../constants/constants";

const FitnessCard = ({ goal, onDelete }: FitnessCardProps) => {
  const { setId, setFormGoalData } = useGoalStore();
  const router = useRouter();

  let percentage = (goal.current_progress / goal.target_value) * 100;
  if (percentage > 100) {
    percentage = 100;
  }

  const handleEdit = (id: any) => {
    setFormGoalData(goal);
    router.push("/goal-form");
    setId(id);
  };

  return (
    <div className="bg-primary rounded-2xl shadow-xl p-8 w-full text-white transition-transform transform hover:scale-105 hover:shadow-2xl">
      <h2 className="text-2xl font-bold uppercase text-center mb-4">
        {goal.goal_type.replace("_", " ")}
      </h2>

      <div className="space-y-3 text-white text-sm">
        <p>
          <span className="font-semibold text-white">{TARGET}</span> {goal.target_value}
        </p>
        <p>
          <span className="font-semibold text-white">{PROGRESS}</span> {goal.current_progress}
        </p>
        <p>
          <span className="font-semibold text-white">{START}</span> {new Date(goal.start_date).toLocaleDateString()}
        </p>
        {goal.end_date && (
          <p>
            <span className="font-semibold text-white">{END}</span> {new Date(goal.end_date).toLocaleDateString()}
          </p>
        )}
      </div>

      <span
        className={`absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full ${
          goal.status === "complete"
            ? "bg-green-100 text-green-600"
            : "bg-yellow-100 text-yellow-600"
        }`}
      >
        {goal.status.toUpperCase()}
      </span>

      <div className="mt-4">
        <div className="flex mb-2 items-center justify-between">
          <span className="text-sm font-semibold inline-block py-1 px-2 uppercase rounded-full text-secondary bg-tertiary">
            {Math.round(percentage)}{PERCENT_ACHIEVED}
          </span>
        </div>
        <div className="relative pt-1">
          <div className="flex">
            <div className="w-full bg-tertiary rounded-full h-2.5">
              <div
                className="bg-secondary h-2.5 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => handleEdit(goal.goal_id)}
          className="cursor-pointer bg-secondary text-white text-sm font-medium px-5 py-2 rounded-lg transition-all hover:bg-hover"
        >
          {EDIT}
        </button>
        <button
          onClick={() => onDelete(goal.goal_id)}
          className="cursor-pointer bg-secondary text-white text-sm font-medium px-5 py-2 rounded-lg transition-all hover:bg-hover"
        >
          {DELETE}
        </button>
      </div>
    </div>
  );
};

export default FitnessCard;
