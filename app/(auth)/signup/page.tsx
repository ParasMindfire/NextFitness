import React from 'react';
import SignupForm from '../../../components/SignupForm';


{/* Container to center the signup form on the screen */}
const Signup = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-tertiary">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-[-150px]">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">
          Sign Up
        </h2>
        <SignupForm />
      </div>
    </div>
  );
};

export default Signup;
