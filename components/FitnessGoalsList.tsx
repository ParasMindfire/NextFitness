'use client';

import React, { useEffect, useState } from 'react';
import { useGoalStore } from '../app/store/useGoalStore';
import FitnessCard from '../components/GoalCard';
import { useRouter } from 'next/navigation';
import { deleteFitnessGoal } from '@/services/GoalAPI';
import {
  PREVIOUS,
  NEXT,
  BACK_TO_DASHBOARD,
  NO_FITNESS,
  LOAD_FITNESS,
} from '../constants/constants';
import useSWR from 'swr';
import DeleteModal from './DeleteModal';

const FitnessGoalsList: React.FC = () => {
  // State for goals, pagination, and delete modal
  const { fitnessGoals, loading, fetchFitnessGoals, trigger, setTrigger } =
    useGoalStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const goalsPerPage = 3;

  // Calculate pagination indexes
  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = fitnessGoals.slice(indexOfFirstGoal, indexOfLastGoal);

  const token: any = localStorage.getItem('accessToken');
  const router = useRouter();

  // Fetch fitness goals using SWR
  const {
    data: FitnessGoal,
    error,
    isLoading,
    mutate,
  } = useSWR(
    token ? ['/fitnessGoals', token] : null,
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false }
  );

  // Fetch function for fitness goals
  const fetcher = async (url: string, token: string) => {
    return await fetchFitnessGoals(token);
  };

  // Fetch goals on component mount
  useEffect(() => {
    fetchFitnessGoals(token);
  }, [token]);

  // Pagination functions
  const nextPage = () => {
    if (indexOfLastGoal < fitnessGoals.length) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // Handle delete confirmation
  const handleDeleteClick = (goalId: any) => {
    setSelectedGoalId(goalId);
    setIsModalOpen(true);
  };

  // Delete goal and update UI
  const confirmDelete = () => {
    if (selectedGoalId) {
      deleteFitnessGoal(token, selectedGoalId);
      setIsModalOpen(false);
      mutate();
    }
  };

  // Navigate back to dashboard
  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto text-center mt-24'>
      <h2 className='text-4xl font-extrabold text-secondary mb-6'>
        Fitness Goals
      </h2>

      {loading && <p className='text-secondary'>{LOAD_FITNESS}</p>}
      {error && <p className='text-error'>{error}</p>}

      {/* Display fitness goal cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center'>
        {currentGoals.length > 0 ? (
          currentGoals.map((goal) => (
            <FitnessCard
              key={goal.goal_id}
              goal={goal}
              onDelete={handleDeleteClick}
            />
          ))
        ) : (
          <p className='text-secondary'>{NO_FITNESS}</p>
        )}
      </div>

      {/* Pagination and navigation buttons */}
      <div className='flex flex-col justify-center items-center mt-8 space-y-4'>
        <div className='flex justify-center items-center space-x-8'>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              currentPage === 1
                ? 'bg-nAllowed cursor-not-allowed'
                : 'bg-primary hover:bg-hover cursor-pointer'
            }`}
          >
            {PREVIOUS}
          </button>

          <span className='text-secondary font-semibold text-lg'>
            Page {currentPage} of{' '}
            {Math.ceil(fitnessGoals.length / goalsPerPage)}
          </span>

          <button
            onClick={nextPage}
            disabled={indexOfLastGoal >= fitnessGoals.length}
            className={`px-4 py-2 rounded-lg text-white font-medium ${
              indexOfLastGoal >= fitnessGoals.length
                ? 'bg-nAllowed cursor-not-allowed'
                : 'bg-primary hover:bg-hover cursor-pointer'
            }`}
          >
            {NEXT}
          </button>
        </div>

        <button
          onClick={handleBack}
          className='cursor-pointer w-full max-w-xs bg-tertiary hover:bg-hover hover:text-white text-secondary font-bold py-3 rounded-lg transition duration-200'
        >
          {BACK_TO_DASHBOARD}
        </button>
      </div>

      {/* Delete confirmation modal */}
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default FitnessGoalsList;
