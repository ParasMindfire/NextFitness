"use client";

import React from 'react';

interface LoadingButtonProps {
  loading: boolean; // Determines if the button is in a loading state
  onClick?: () => void; // Optional click handler function
  type?: "button" | "submit" | "reset"; // Button type
  children: React.ReactNode; // Button content
  className?: string; // Additional CSS classes for styling
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  onClick,
  type = "button", // Default button type
  children,
  className = "" // Default to an empty string if no class is provided
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading} // Disable button if loading is true
      className={`w-full cursor-pointer ${
        loading
          ? "bg-secondary cursor-not-allowed" // Apply disabled styles if loading
          : "bg-primary hover:bg-hover" // Apply hover effect if not loading
      } text-white font-bold py-2 rounded-lg transition duration-200 ${className}`} // Add extra styles from className prop
    >
      {children} {/* Render button content */}
    </button>
  );
};

export default LoadingButton;
