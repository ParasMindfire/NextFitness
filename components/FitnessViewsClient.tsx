'use client';

import React from 'react';
import GoalListManager from './GoalListManager';
import BackButton from './BackButton';
import { FITNESS_GOALS, LOAD_FITNESS } from '../constants/constants';
import { useGoalStore } from '../app/store/useGoalStore';

const FitnessViewsClient = () => {
  const { loading } = useGoalStore(); // Fetch loading state from store

  return (
    <div className='bg-white p-8 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto text-center mt-24'>
      <h2 className='text-4xl font-extrabold text-secondary mb-6'>
        {FITNESS_GOALS}
      </h2>
      {/* Show loading text if data is still being fetched */}
      {loading && <p className='text-secondary'>{LOAD_FITNESS}</p>}
      <GoalListManager /> {/* Renders the list of fitness goals */}
      <BackButton /> {/* Navigates back to the previous page */}
    </div>
  );
};

export default FitnessViewsClient;
