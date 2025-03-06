import React from 'react';
import UserProfile from '@/components/UserProfile';
import WorkoutStats from '@/components/WorkoutStats';

const ProfilePage: React.FC = () => {
  return (
    <div className='p-4 space-y-4 bg-tertiary min-h-screen'>
      <UserProfile />
      <WorkoutStats />
    </div>
  );
};

export default ProfilePage;
