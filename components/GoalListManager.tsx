"use client";

import React, { useState } from 'react';
import GoalCardList from './GoalCardList';
import DeleteModal from './DeleteModal';
import { useGoalStore } from "../app/store/useGoalStore";
import { deleteFitnessGoal } from "@/services/GoalAPI";

const GoalListManager = () => {
  const { fitnessGoals, trigger, setTrigger } = useGoalStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const goalsPerPage = 3;

  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = fitnessGoals.slice(indexOfFirstGoal, indexOfLastGoal);
  const totalPages = Math.ceil(fitnessGoals.length / goalsPerPage);

  const nextPage = () => {
    if (indexOfLastGoal < fitnessGoals.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDeleteClick = (goalId: any) => {
    setSelectedGoalId(goalId);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    const token = localStorage.getItem("accessToken");
    if (selectedGoalId && token) {
      deleteFitnessGoal(token, selectedGoalId);
      setIsModalOpen(false);
      setTrigger(!trigger); // Toggle the trigger state
    }
  };

  return (
    <>
      <GoalCardList
        currentGoals={currentGoals}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        onDelete={handleDeleteClick}
      />
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default GoalListManager;
