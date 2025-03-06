'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { signupUser } from '../services/UserAPI'; // Adjust the import path as needed
import { useUserStore } from '../app/store/useUserStore';
import { SignupFormData } from '@/app/types'; // Ensure this path is correct
import { showToast } from '@/utils/Toast';
import ErrorMessage from './ErrorMessage';
import LoadingButton from './LoadingButton';

const SignupForm = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Initialize form handling with react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  // Handle form submission
  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError('');
    try {
      const result = await signupUser(data);

      console.log("result ",result);

      if (result.message === 'User Registered Successfully') {
        localStorage.setItem('accessToken', result.accessToken);
        setUser(result.user);
        router.push('/');
        showToast('Signup Successfully', 'success');
      } else {
        setError(result.message);
        showToast('Signup Failed', 'error');
      }
    } catch (error) {
      showToast('Signup Failed', 'error');
    }

    setLoading(false);
  };

  return (
    <>
      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        {/* Username input field */}
        <input
          type='text'
          placeholder='Username'
          {...register('name', {
            required: 'Username is required',
          })}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        />
        {errors.name && (
          <p className='text-error text-sm'>{errors.name.message}</p>
        )}

        {/* Email input field */}
        <input
          type='email'
          placeholder='Email'
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Enter a valid email',
            },
          })}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        />
        {errors.email && (
          <p className='text-error text-sm'>{errors.email.message}</p>
        )}

        {/* Password input field */}
        <input
          type='password'
          placeholder='Password'
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
          className='w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary'
        />
        {errors.password && (
          <p className='text-error text-sm'>{errors.password.message}</p>
        )}

        <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.phone && (
            <p className="text-error text-sm">{errors.phone.message}</p>
          )}

          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.address && (
            <p className="text-error text-sm">{errors.address.message}</p>
          )}

        {/* Display error message if any */}
        {error && <ErrorMessage message={error} />}

        {/* Submit button with loading state */}
        <LoadingButton loading={loading} type='submit'>
          {loading ? 'Signing up...' : 'SIGN UP'}
        </LoadingButton>
      </form>

      {/* Button to navigate back to the landing page */}
      <LoadingButton
        loading={false}
        onClick={() => router.push('/')}
        className='mt-4'
      >
        BACK TO LANDING
      </LoadingButton>
    </>
  );
};

export default SignupForm;
