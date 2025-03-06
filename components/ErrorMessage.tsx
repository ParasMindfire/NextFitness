"use client";

import React from "react";

// Define props for the ErrorMessage component
interface ErrorMessageProps {
  message: string; // The error message to be displayed
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    // Display the error message with styling
    <p className="text-error text-sm text-center">
      {message}
    </p>
  );
};

export default ErrorMessage;
