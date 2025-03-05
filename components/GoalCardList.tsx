"use client";

import React from 'react';
import FitnessCard from "./GoalCard";
import { PREVIOUS, NEXT } from "../constants/constants";

interface GoalCardListProps {
  currentGoals: any[];
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
  onDelete: (goalId: any) => void;
}

const GoalCardList: React.FC<GoalCardListProps> = ({
  currentGoals,
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage,
  onDelete,
}) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
        {currentGoals.length > 0 ? (
          currentGoals.map((goal) => (
            <FitnessCard key={goal.goal_id} goal={goal} onDelete={onDelete} />
          ))
        ) : (
          <p className="text-secondary">No fitness goals available.</p>
        )}
      </div>
      <div className="flex justify-center items-center space-x-8 mt-8">
        <button
          onClick={onPrevPage}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage === 1
              ? "bg-nAllowed cursor-not-allowed"
              : "bg-primary hover:bg-hover cursor-pointer"
          }`}
        >
          {PREVIOUS}
        </button>
        <span className="text-secondary font-semibold text-lg">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNextPage}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg text-white font-medium ${
            currentPage === totalPages
              ? "bg-nAllowed cursor-not-allowed"
              : "bg-primary hover:bg-hover cursor-pointer"
          }`}
        >
          {NEXT}
        </button>
      </div>
    </div>
  );
};

export default GoalCardList;
