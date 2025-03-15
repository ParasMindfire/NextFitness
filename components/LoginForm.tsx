"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { loginUser } from '../services/UserAPI';
import { useUserStore } from '../app/store/useUserStore';
import { LoginFormData } from '@/app/types';
import { showToast } from '@/utils/Toast';
import ErrorMessage from './ErrorMessage';
import LoadingButton from './LoadingButton';
import * as Sentry from '@sentry/nextjs';
import { GoogleSignInButton } from './authButtons';

const LoginForm = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(data);
      if (result.message === 'Login successful') {
        localStorage.setItem('accessToken', result.accessToken);
        setUser(result.user);
        router.push('/');
        showToast('Login Successful', 'success');
      } else {
        setError(result.message);
        showToast(result.message, 'error');
      }
    } catch (err) {
      Sentry.captureException(err);
      setError('An unexpected error occurred. Please try again.');
      showToast('Login Failed', 'error');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email',
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        {error && <ErrorMessage message={error} />}

        <LoadingButton loading={loading} type="submit" className="w-full">
          {loading ? 'Logging in...' : 'LOGIN'}
        </LoadingButton>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-t border-gray-300" />
        <span className="px-2 text-gray-500">or</span>
        <hr className="flex-grow border-t border-gray-300" />
      </div>

      <div className="text-center">
        <GoogleSignInButton />
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Don't have an account? <a href="/signup" className="text-primary font-semibold">Sign up</a>
      </p>
    </div>
  );
};

export default LoginForm;