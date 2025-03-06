import React from "react";
import FitnessGoalsList from "@/components/FitnessGoalsList";

{/* Container for displaying fitness goals */}
const FitnessViews: React.FC = () => {
  return (
    <div className="flex flex-col items-center h-auto bg-tertiary p-6 min-h-screen">
      <FitnessGoalsList />
    </div>
  );
};

export default FitnessViews;
