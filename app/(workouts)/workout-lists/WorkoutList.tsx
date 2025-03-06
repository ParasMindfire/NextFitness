import React from 'react';
import WorkoutList from '@/components/WorkoutList';

const WorkoutViews: React.FC = () => {
  return (
    <>
      {/* Container for displaying the list of workouts */}
      <div className='flex flex-col h-auto bg-tertiary p-6 min-h-screen'>
        {/* Workout list component */}
        <WorkoutList />
      </div>
    </>
  );
};

export default WorkoutViews;
