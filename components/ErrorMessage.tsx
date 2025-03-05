"use client";

import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className="text-error text-sm text-center">{message}</p>;
};

export default ErrorMessage;
