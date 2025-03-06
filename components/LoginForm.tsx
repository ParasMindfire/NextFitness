"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form"; // Form handling library
import { useRouter } from "next/navigation"; // Next.js router for navigation
import { loginUser } from "../services/UserAPI"; // API function for login
import { useUserStore } from "../app/store/useUserStore"; // State management for user data
import { LoginFormData } from "@/app/types"; // Type definition for login form data
import { showToast } from "@/utils/Toast"; // Function to show toast notifications
import ErrorMessage from "./ErrorMessage"; // Component for displaying error messages
import LoadingButton from "./LoadingButton"; // Button component with loading state
import * as Sentry from "@sentry/nextjs";

const LoginForm = () => {
  const setUser = useUserStore((state: any) => state.setUser); // Store user data
  const router = useRouter(); // Initialize router for navigation
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const [error, setError] = useState(""); // Error state for handling login errors

  // useForm hook for form validation and handling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  // Function to handle form submission
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");

    try {
      const result = await loginUser(data); // Call login API

      if (result.message === "Login successful") {
        localStorage.setItem("accessToken", result.accessToken); // Store token
        setUser(result.user); // Update user state
        router.push("/"); // Redirect to home page
        showToast("Login Successfully", "success"); // Show success message
      } else {
        Sentry.captureException(error);
        throw new Error("Login failed sentry");
        setError(result.message); // Set error message
        showToast("Login Failed", "error"); // Show error message
      }
    } catch (error) {
      Sentry.captureException(error);
      showToast("Login Failed", "error"); // Show error message on failure
    }

    setLoading(false);
  };

  return (
    <>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {/* Email Input */}
        <input
          type='email'
          placeholder='Email'
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Enter a valid email",
            },
          })}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        />
        {errors.email && (
          <p className='text-error text-sm'>{errors.email.message}</p> // Display email validation error
        )}

        {/* Password Input */}
        <input
          type='password'
          placeholder='Password'
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        />
        {errors.password && (
          <p className='text-error text-sm'>{errors.password.message}</p> // Display password validation error
        )}

        {/* Display API Error Message */}
        {error && <ErrorMessage message={error} />}

        {/* Submit Button with Loading State */}
        <LoadingButton loading={loading} type='submit'>
          {loading ? "Logging in..." : "LOGIN"}
        </LoadingButton>
      </form>

      {/* Back to Landing Page Button */}
      <LoadingButton
        loading={false}
        onClick={() => router.push("/")}
        className='mt-4'
      >
        BACK TO LANDING
      </LoadingButton>
    </>
  );
};

export default LoginForm;
