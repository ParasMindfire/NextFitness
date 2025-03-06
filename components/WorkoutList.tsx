'use client';

import React, { useEffect, useState } from 'react';
import { WorkoutCard } from '../components/WorkoutCard';
import { useWorkoutStore } from '../app/store/useWorkoutStore';
import { deleteWorkout, getUserWorkouts } from '../services/WorkoutAPI';
import { useRouter } from 'next/navigation';
import {
  YOUR_WORKOUTS,
  LOADING_WORKOUTS,
  ASC,
  ASCENDING,
  DESCENDING,
  NO_WORKOUTS,
  PREVIOUS,
  NEXT,
  BACK_TO_DASHBOARD,
} from '../constants/constants';
import useSWR from 'swr';
import DeleteModal from './DeleteModal';

const WorkoutList: React.FC = () => {
  // State and store hooks
  const { workouts, loading, error, fetchWorkouts, trigger, setTrigger } =
    useWorkoutStore();
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc'); // Sort order state
  const workoutsPerPage = 4; // Number of workouts to display per page
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state for delete confirmation
  const [workoutId, setWorkoutId] = useState(null); // ID of workout to delete
  const router = useRouter(); // Router for navigation
  const [token, setToken] = useState<string | null>(null); // Token for API requests

  // Fetch token from local storage on component mount
  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

  // Fetch fitness goals using SWR
  const {
    data: FitnessGoal,
    isLoading,
    mutate,
  } = useSWR(
    token ? ['/fitnessGoals', token] : null,
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false }
  );

  // Fetcher function for SWR
  const fetcher = async (url: string, token: string) => {
    return await fetchWorkouts(token);
  };

  // Fetch workouts when token is available
  useEffect(() => {
    if (token) {
      fetchWorkouts(token);
    }
  }, [token]);

  // Sort workouts by date
  const sortedWorkouts = [...workouts].sort((a, b) => {
    const dateA = new Date(a.workout_date).getTime();
    const dateB = new Date(b.workout_date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedWorkouts.length / workoutsPerPage);
  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = sortedWorkouts.slice(
    indexOfFirstWorkout,
    indexOfLastWorkout
  );

  // Pagination controls
  const nextPage = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  // Toggle sort order
  const toggleSortOrder = () =>
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  // Handle delete button click
  const handleDeleteClick = (id: any) => {
    setWorkoutId(id);
    setIsModalOpen(true);
  };

  // Confirm workout deletion
  const confirmDelete = async () => {
    if (workoutId && token) {
      await deleteWorkout(token, workoutId);
      getUserWorkouts(token);
      setIsModalOpen(false);
      mutate();
    }
  };

  // Navigate back to dashboard
  const handleBack = () => router.push('/');

  return (
    <div className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto text-center mt-24'>
      <h2 className='text-4xl font-extrabold text-secondary mb-6'>
        {YOUR_WORKOUTS}
      </h2>

      {loading && <p className='text-primary'>{LOADING_WORKOUTS}</p>}
      {error && <p className='text-error'>{error}</p>}

      {workouts.length > 0 ? (
        <>
          <div className='flex justify-end mb-8'>
            <button
              onClick={toggleSortOrder}
              className='cursor-pointer bg-primary text-white font-semibold px-6 py-3 rounded-lg transition-all hover:bg-hover'
            >
              Sort by Date ({sortOrder === ASC ? ASCENDING : DESCENDING})
            </button>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full'>
            {currentWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.workout_id}
                workout={workout}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className='flex flex-col justify-center items-center mt-8 space-y-4'>
              <div className='flex justify-center items-center space-x-8'>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                    currentPage === 1
                      ? 'bg-nAllowed cursor-not-allowed'
                      : 'bg-primary hover:bg-hover cursor-pointer'
                  }`}
                >
                  {PREVIOUS}
                </button>

                <span className='text-secondary font-semibold text-lg'>
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                    currentPage === totalPages
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
          )}
        </>
      ) : (
        <p className='text-gray-500 mt-6'>{NO_WORKOUTS}</p>
      )}

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

export default WorkoutList;
