"use client";

import React from "react";
import { WorkoutDurationStats } from "@/components/WorkoutDurationStat";
import { WorkoutCaloriesStats } from "@/components/WorkoutCaloriStat";

const WorkoutStats: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4 space-y-4 md:space-y-0 bg-white">
      {/* Container for workout duration statistics */}
      <div className="w-full md:w-1/2 p-4 border-r border-tertiary overflow-auto">
        <WorkoutDurationStats /> {/* Component displaying workout duration stats */}
      </div>

      {/* Container for workout calories statistics */}
      <div className="w-full md:w-1/2 p-4 overflow-auto">
        <WorkoutCaloriesStats /> {/* Component displaying workout calories stats */}
      </div>
    </div>
  );
};

export default WorkoutStats;
