"use client";

import React from 'react';

interface LoadingButtonProps {
  loading: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  children: React.ReactNode;
  className?: string; // Add className prop
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  onClick,
  type = "button",
  children,
  className = "" // Provide a default empty string
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full cursor-pointer ${
        loading
          ? "bg-secondary cursor-not-allowed"
          : "bg-primary hover:bg-hover"
      } text-white font-bold py-2 rounded-lg transition duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default LoadingButton;
