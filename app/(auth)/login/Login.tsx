import React from 'react';
import LoginForm from '../../../components/LoginForm';

{/* Container to center the login form on the screen */}
const Login = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-tertiary">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-[-150px]">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">
          Login
        </h2>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
