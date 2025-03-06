'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useGoalStore } from '../app/store/useGoalStore';
import { createFitnessGoal, updateFitnessGoal } from '@/services/GoalAPI';
import { showToast } from '@/utils/Toast';
import FormField from './FormField';

interface FitnessFormData {
  goal_type: string;
  target_value: number;
  current_progress: number;
  start_date: string;
  end_date: string;
  status: string;
}

const FitnessForm = () => {
  // Get goal state and router
  const { id, setId, formGoalData, setFormGoalData } = useGoalStore();
  const router = useRouter();

  // Form setup with default values
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FitnessFormData>({
    defaultValues: {
      goal_type: 'weight_loss',
      target_value: 0,
      current_progress: 0,
      start_date: '',
      end_date: '',
      status: 'pending',
    },
  });

  // Populate form if editing an existing goal
  useEffect(() => {
    if (formGoalData) {
      reset({
        goal_type: formGoalData.goal_type,
        target_value: formGoalData.target_value,
        current_progress: formGoalData.current_progress,
        start_date: formGoalData.start_date,
        end_date: formGoalData.end_date || '',
        status: formGoalData.status || 'pending',
      });
    }
  }, [formGoalData, reset]);

  // Handle form submission for creating or updating a goal
  const onSubmit = async (data: FitnessFormData) => {
    if (
      data.start_date &&
      data.end_date &&
      new Date(data.end_date) < new Date(data.start_date)
    ) {
      console.log('End date cannot be less than start date');
      return;
    }

    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      if (formGoalData) {
        await updateFitnessGoal(token, id, data);
        setId(null);
        showToast('Goal Edited Successfully', 'success');
      } else {
        await createFitnessGoal(token, data);
        showToast('Goal Added Successfully', 'success');
      }
      setFormGoalData(null);
      reset();
      router.push('/goal-lists');
    } catch (error) {
      showToast('An error occurred. Please try again!', 'error');
    }
  };

  // Handle back button click
  const handleBack = () => {
    setFormGoalData(null);
    router.push('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='bg-white p-6 rounded-2xl shadow-xl w-[500px] space-y-4'
    >
      {/* Form title */}
      <h2 className='text-xl font-semibold mb-4 text-center text-primary'>
        {formGoalData ? 'Edit Fitness Goal' : 'Add Fitness Goal'}
      </h2>

      {/* Form fields */}
      <FormField
        label='Goal Type'
        id='goal_type'
        register={register}
        errors={errors}
        type='select'
        options={[
          { value: 'weight_loss', label: 'WEIGHT LOSS' },
          { value: 'workout_per_week', label: 'Workout Per Week' },
        ]}
      />

      <FormField
        label='Target Value'
        id='target_value'
        register={register}
        errors={errors}
        type='number'
        placeholder='0'
        validation={{
          required: 'Target value is required',
          validate: (value: any) =>
            Number(value) > 0 || 'Target value must be greater than 0',
        }}
      />

      <FormField
        label='Current Progress'
        id='current_progress'
        register={register}
        errors={errors}
        type='number'
        placeholder='0'
        validation={{
          required: 'Current progress is required',
          valueAsNumber: true,
          validate: (value: any) =>
            value > 0 || 'Current progress must be greater than 0',
        }}
      />

      <FormField
        label='Start Date'
        id='start_date'
        register={register}
        errors={errors}
        type='date'
        validation={{ required: 'Start date is required' }}
      />

      <FormField
        label='End Date'
        id='end_date'
        register={register}
        errors={errors}
        type='date'
        validation={{
          required: 'End date is required',
          validate: (value: any) => {
            const startDate = watch('start_date');
            if (startDate && new Date(value) < new Date(startDate)) {
              return 'End date cannot be less than start date';
            }
            return true;
          },
        }}
      />

      <FormField
        label='Status'
        id='status'
        register={register}
        errors={errors}
        type='select'
        options={[
          { value: 'pending', label: 'PENDING' },
          { value: 'complete', label: 'COMPLETE' },
          { value: 'incomplete', label: 'INCOMPLETE' },
        ]}
      />

      {/* Submit button */}
      <button
        type='submit'
        className='w-full bg-primary hover:bg-secondary text-white font-semibold px-4 py-2 rounded-lg transition'
      >
        {formGoalData ? 'UPDATE GOAL' : 'ADD GOAL'}
      </button>

      {/* Back button */}
      <button
        type='button'
        onClick={handleBack}
        className='w-full mt-4 bg-tertiary hover:bg-hover text-secondary font-bold py-2 rounded-lg transition duration-200'
      >
        BACK TO DASHBOARD
      </button>
    </form>
  );
};

export default FitnessForm;
