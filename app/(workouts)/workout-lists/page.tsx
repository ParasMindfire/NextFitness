"use client"

import React, { useEffect, useState } from "react";
import { WorkoutCard } from "../../../components/WorkoutCard";
import { useWorkoutStore } from "../../store/useWorkoutStore";
import { deleteWorkout,getUserWorkouts } from "../../../services/WorkoutAPI";
// import { showToast } from "../../helpers/ToastHelper";
import { useRouter } from "next/navigation";
import { YOUR_WORKOUTS, LOADING_WORKOUTS, ASC, ASCENDING, DESCENDING, ARE_U_SURE2, NEXT, PREVIOUS, BACK_TO_DASHBOARD, CONFIRM_DELETE, CANCEL, DELETE, NO_WORKOUTS } from "../../../constants/constants";

const WorkoutViews: React.FC = () => {
  const { workouts, loading, error,fetchWorkouts,trigger,setTrigger } = useWorkoutStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const workoutsPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workoutId, setWorkoutId] = useState(null);
  const router = useRouter();

  useEffect(()=>{
    fetchWorkouts();
  },[trigger])

  

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
      // showToast("Workout Deleted Successfully", "success");
      getUserWorkouts(token);
      setIsModalOpen(false);
      setTrigger(!trigger);
    }
  };

  const handleBack = () => router.push("/");

  return (
    <div className="flex flex-col justify-center h-[500px] bg-gray-100 p-12 mt-36">
      <div className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-full text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-10">{YOUR_WORKOUTS}</h2>

        {loading && <p className="text-gray-500">{LOADING_WORKOUTS}</p>}
        {error && <p className="text-red-500">{error}</p>}

        {workouts.length > 0 ? (
          <>
            <div className="flex justify-end mb-8">
              <button
                onClick={toggleSortOrder}
                className="cursor-pointer bg-purple-600 text-white font-semibold px-6 py-3 rounded-lg transition-all hover:bg-purple-700"
              >
                Sort by Date ({sortOrder === ASC ? ASCENDING : DESCENDING})
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
              {currentWorkouts.map((workout) => (
                <WorkoutCard key={workout.workout_id} workout={workout} onDelete={handleDeleteClick} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex flex-col justify-center items-center mt-12 space-y-4">
                <div className="flex justify-center items-center space-x-8">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                      currentPage === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-gray-600 cursor-pointer"
                    }`}
                  >
                    {PREVIOUS}
                  </button>

                  <span className="text-gray-700 font-semibold text-lg">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className={`px-6 py-3 rounded-lg text-white font-medium transition ${
                      currentPage === totalPages ? " bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-gray-800 cursor-pointer"
                    }`}
                  >
                    {NEXT}
                  </button>
                </div>

                <button
                  onClick={handleBack}
                  className="cursor-pointer w-80 bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 rounded-lg transition duration-200"
                >
                  {BACK_TO_DASHBOARD}
                </button>

                {isModalOpen && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-lg w-96">
                      <h2 className="text-xl font-bold text-gray-800">{CONFIRM_DELETE}</h2>
                      <p className="text-gray-600 mt-2">{ARE_U_SURE2}</p>
                      <div className="flex justify-end mt-6 space-x-4">
                        <button onClick={() => setIsModalOpen(false)} className="cursor:pointer bg-gray-300 px-5 py-2 rounded-lg">
                          {CANCEL}
                        </button>
                        <button onClick={confirmDelete} className="cursor:pointer bg-purple-600 text-white px-5 py-2 rounded-lg hover:bg-gray-800">
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
