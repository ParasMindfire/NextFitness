import React from 'react';
import WorkoutForm from '@/components/WorkoutForm';

const WorkoutFormPage: React.FC = () => {
  return (
    <>
      {/* Container for the workout form with top margin */}
      <div className='mt-32'>
        {/* Workout form component */}
        <WorkoutForm />
      </div>
    </>
  );
};

export default WorkoutFormPage;
