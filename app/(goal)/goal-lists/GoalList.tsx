"use client";

import { useEffect, useState } from "react";
import { useGoalStore } from "../../store/useGoalStore";
import FitnessCard from "../../../components/GoalCard";
import { useRouter } from "next/navigation";
import {
  PREVIOUS,
  NEXT,
  CANCEL,
  DELETE,
  BACK_TO_DASHBOARD,
  FITNESS_GOALS,
  LOAD_FITNESS,
  NO_FITNESS,
  CONFIRM_DELETE,
  ARE_U_SURE
} from "../../../constants/constants";
import { deleteFitnessGoal, getAllFitnessGoals } from "@/services/GoalAPI";
import { FitnessGoal } from "@/app/types";
import useSWR from "swr";


const FitnessViews = () => {
  const { fitnessGoals, loading, fetchFitnessGoals, trigger, setTrigger } = useGoalStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState(null);
  const goalsPerPage = 3;

  const indexOfLastGoal = currentPage * goalsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - goalsPerPage;
  const currentGoals = fitnessGoals.slice(indexOfFirstGoal, indexOfLastGoal);

  const token: any = localStorage.getItem("accessToken");
  const router = useRouter();

  const { data: FitnessGoal, error, isLoading, mutate } = useSWR(
    token ? ["/fitnessGoals", token] : null,
    ([url, token]) => fetcher(url, token),
    { revalidateOnFocus: false } // Prevent unnecessary re-fetching when tab is focused
  );
  
  const fetcher = async (url: string, token: string) => {
    console.log("fetcher me aya ?");
    return await fetchFitnessGoals(token);
  };

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
    const token: any = localStorage.getItem("accessToken");
    if (selectedGoalId) {
      deleteFitnessGoal(token, selectedGoalId);
      setIsModalOpen(false);
      mutate();
      // setTrigger(!trigger);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center h-auto bg-tertiary p-6 min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto text-center mt-24">
        <h2 className="text-4xl font-extrabold text-secondary mb-6">{FITNESS_GOALS}</h2>

        {loading && <p className="text-secondary">{LOAD_FITNESS}</p>}
        {error && <p className="text-error">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
          {currentGoals.length > 0 ? (
            currentGoals.map((goal) => (
              <FitnessCard key={goal.goal_id} goal={goal} onDelete={handleDeleteClick} />
            ))
          ) : (
            <p className="text-secondary">{NO_FITNESS}</p>
          )}
        </div>

        <div className="flex flex-col justify-center items-center mt-8 space-y-4">
          <div className="flex justify-center items-center space-x-8">
            <button
              onClick={prevPage}
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
                Page {currentPage} of {Math.ceil(indexOfLastGoal/3)}
              </span>

            <button
              onClick={nextPage}
              disabled={indexOfLastGoal >= fitnessGoals.length}
              className={`px-4 py-2 rounded-lg text-white font-medium ${
                indexOfLastGoal >= fitnessGoals.length
                  ? "bg-nAllowed cursor-not-allowed"
                  : "bg-primary hover:bg-hover cursor-pointer"
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
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold">{CONFIRM_DELETE}</h2>
            <p>{ARE_U_SURE}</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="cursor-pointer bg-primary px-4 py-2 rounded-lg mr-2"
              >
                {CANCEL}
              </button>
              <button
                onClick={confirmDelete}
                className="cursor-pointer bg-secondary hover:bg-hover text-white px-4 py-2 rounded-lg"
              >
                {DELETE}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FitnessViews;
function fetchFitnessGoals(token: string) {
  throw new Error("Function not implemented.");
}

