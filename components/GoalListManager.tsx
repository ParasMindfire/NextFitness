'use client';

import React, { useState } from 'react';
import GoalCardList from './GoalCardList';
import DeleteModal from './DeleteModal';
import { useGoalStore } from '../app/store/useGoalStore';
import { deleteFitnessGoal } from '@/services/GoalAPI';

const GoalListManager = () => {
  // Get fitness goals and trigger state from the store
  const { fitnessGoals, trigger, setTrigger } = useGoalStore();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  // Modal state for delete confirmation
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to store the goal ID selected for deletion
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const goalsPerPage = 3; // Number of goals per page

  // Calculate indexes for slicing the goals array
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;

  // Get the goals for the current page
  const currentGoals = fitnessGoals.slice(indexOfFirstGoal, indexOfLastGoal);

  // Calculate total number of pages
  const totalPages = Math.ceil(fitnessGoals.length / goalsPerPage);

  // Go to the next page if there are more goals
  const nextPage = () => {
    if (indexOfLastGoal < fitnessGoals.length) setCurrentPage(currentPage + 1);
  };

  // Go to the previous page if not on the first page
  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Open the delete confirmation modal and store the goal ID
  const handleDeleteClick = (goalId: any) => {
    setSelectedGoalId(goalId);
    setIsModalOpen(true);
  };

  // Confirm deletion and trigger re-fetch of goals
  const confirmDelete = () => {
    const token = localStorage.getItem('accessToken');
    if (selectedGoalId && token) {
      deleteFitnessGoal(token, selectedGoalId);
      setIsModalOpen(false);
      setTrigger(!trigger); // Toggle the trigger state to refresh goals
    }
  };

  return (
    <>
      {/* Render the goal card list with pagination and delete functionality */}
      <GoalCardList
        currentGoals={currentGoals}
        currentPage={currentPage}
        totalPages={totalPages}
        onPrevPage={prevPage}
        onNextPage={nextPage}
        onDelete={handleDeleteClick}
      />

      {/* Delete confirmation modal */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
};

export default GoalListManager;
