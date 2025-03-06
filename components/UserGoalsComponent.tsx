import React from "react";
import UserGoals from "@/components/GlobalUserComponent";

const UserGoalsComponent: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 bg-white p-6 rounded-xl shadow-lg">
      {/* Title for the goals section */}
      <h2 className="text-2xl font-bold text-primary mb-4">
        Goals Added World Wide
      </h2>

      {/* Component to display user goals */}
      <UserGoals />
    </div>
  );
};

export default UserGoalsComponent;
