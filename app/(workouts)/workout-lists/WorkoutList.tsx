import React from "react";
import WorkoutList from "@/components/WorkoutList";

const WorkoutViews: React.FC = () => {
  return (
    <div className="flex flex-col h-auto bg-tertiary p-6 min-h-screen">
      <WorkoutList />
    </div>
  );
};

export default WorkoutViews;
