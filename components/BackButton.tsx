"use client";

import React from 'react';
import { useRouter } from "next/navigation";
import { useGoalStore } from "../app/store/useGoalStore";

const BackButton = () => {
  const { setFormGoalData } = useGoalStore();
  const router = useRouter();

  const handleBack = () => {
    setFormGoalData(null);
    router.push("/");
  };

  return (
    <button
      onClick={handleBack}
      className="cursor-pointer w-full mt-4 bg-tertiary hover:bg-hover text-secondary font-bold py-2 rounded-lg transition duration-200"
    >
      BACK TO DASHBOARD
    </button>
  );
};

export default BackButton;
