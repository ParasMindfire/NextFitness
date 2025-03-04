"use client";

import React, { useEffect, useState } from "react";
import { WorkoutCard } from "../../../components/WorkoutCard";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { deleteWorkout, getUserWorkouts } from "../../../services/WorkoutAPI";
import { useRouter } from "next/navigation";
import {
  YOUR_WORKOUTS,
  LOADING_WORKOUTS,
  ASC,
  ASCENDING,
  DESCENDING,
  ARE_U_SURE2,
  NEXT,
  PREVIOUS,
  BACK_TO_DASHBOARD,
  CONFIRM_DELETE,
  CANCEL,
  DELETE,
  NO_WORKOUTS
} from "../../../constants/constants";

const WorkoutViews: React.FC = () => {
  const { workouts, loading, error, fetchWorkouts, trigger, setTrigger } = useWorkoutStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const workoutsPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState(null);
  const router = useRouter();

  const token: any = localStorage.getItem("accessToken");

  useEffect(() => {
    fetchWorkouts(token);
  }, [trigger]);

  const sortedWorkouts = [...workouts].sort((a, b) => {
    const dateA = new Date(a.workout_date).getTime();
    const dateB = new Date(b.workout_date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const totalPages = Math.ceil(sortedWorkouts.length / workoutsPerPage);
  const indexOfLastWorkout = currentPage * workoutsPerPage;
  const indexOfFirstWorkout = indexOfLastWorkout - workoutsPerPage;
  const currentWorkouts = sortedWorkouts.slice(indexOfFirstWorkout, indexOfLastWorkout);

  const nextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);

  const toggleSortOrder = () => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');

  const handleDeleteClick = (id: any) => {
    setWorkoutId(id);
    setIsModalOpen(true);
  };

  const confirmDelete = async () => {
    const token: any = localStorage.getItem("accessToken");
    if (workoutId) {
      await deleteWorkout(token, workoutId);
      getUserWorkouts(token);
      setIsModalOpen(false);
      setTrigger(!trigger);
    }
  };

  const handleBack = () => router.push("/");

  return (
    <div className="flex flex-col h-auto bg-tertiary p-6 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto text-center mt-24">
        <h2 className="text-4xl font-extrabold text-secondary mb-6">{YOUR_WORKOUTS}</h2>

        {loading && <p className="text-primary">{LOADING_WORKOUTS}</p>}
        {error && <p className="text-error">{error}</p>}

        {workouts.length > 0 ? (
          <>
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleSortOrder}
                className="cursor-pointer bg-primary text-white font-semibold px-6 py-3 rounded-lg transition-all hover:bg-hover"
              >
                Sort by Date ({sortOrder === ASC ? ASCENDING : DESCENDING})
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
              {currentWorkouts.map((workout) => (
                <WorkoutCard key={workout.workout_id} workout={workout} onDelete={handleDeleteClick} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col justify-center items-center mt-8 space-y-4">
                <div className="flex justify-center items-center space-x-8">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                      currentPage === 1 ? "bg-nAllowed cursor-not-allowed" : "bg-primary hover:bg-hover cursor-pointer"
                    }`}
                  >
                    {PREVIOUS}
                  </button>

                  <span className="text-secondary font-semibold text-lg">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                      currentPage === totalPages ? "bg-nAllowed cursor-not-allowed" : "bg-primary hover:bg-hover cursor-pointer"
                    }`}
                  >
                    {NEXT}
                  </button>
                </div>

                <button
                  onClick={handleBack}
                  className="cursor-pointer w-full max-w-xs bg-tertiary hover:bg-hover hover:text-white text-secondary font-bold py-3 rounded-lg transition duration-200"
                >
                  {BACK_TO_DASHBOARD}
                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                      <h2 className="text-xl font-bold text-gray-800">{CONFIRM_DELETE}</h2>
                      <p className="text-secondary mt-2">{ARE_U_SURE2}</p>
                      <div className="flex justify-end mt-6 space-x-4">
                        <button onClick={() => setIsModalOpen(false)} className="cursor-pointer bg-tertiary px-5 py-2 rounded-lg">
                          {CANCEL}
                        </button>
                        <button onClick={confirmDelete} className="cursor-pointer bg-primary text-white px-5 py-2 rounded-lg hover:bg-hover">
                          {DELETE}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 mt-6">{NO_WORKOUTS}</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutViews;
