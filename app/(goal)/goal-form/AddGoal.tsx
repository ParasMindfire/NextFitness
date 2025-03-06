import React from 'react';
import FitnessForm from '../../../components/FitnessForm';
import BackButton from '../../../components/BackButton';

{
  /* Container to center the fitness form on the page */
}
const FitnessFormPage = () => {
  return (
    <div className='flex justify-center items-center h-[500px] mt-44'>
      <FitnessForm />
    </div>
  );
};

export default FitnessFormPage;
