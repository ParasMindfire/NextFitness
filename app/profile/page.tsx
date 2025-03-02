"use client"

import { useEffect, useState } from 'react';
import { getSingleUser } from '../../services/UserAPI';
import { User } from '../../app/types';
import { WorkoutDurationStats } from '@/components/WorkoutDurationStat';
import { WorkoutCaloriesStats } from '@/components/WorkoutCaloriStat';
import { useWorkoutStore } from '../store/useWorkoutStore';
// import { uploadUserPhoto } from '../../services/WorkoutAPI';

const ProfilePage = () => {
  const token: any = localStorage.getItem("accessToken");
  const [user, setUser] = useState<User | null>(null);
  const { fetchWorkouts } = useWorkoutStore();

  useEffect(() => {
    fetchWorkouts(token);
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const token: any = localStorage.getItem("accessToken");
      const incomingUser = await getSingleUser(token);
      setUser(incomingUser);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4 space-y-4 md:space-y-0">
        <div className="flex justify-center items-center w-full md:w-1/6 p-4 bg-purple-400 mr-2">
          <label htmlFor="photo-upload" className="cursor-pointer relative">
            {user?.profile_pic ? (
              <img
                src={`/uploads/${user?.profile_pic}`}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-4 border-purple-600 md:w-24 md:h-24"
              />
            ) : (
              <div className="w-24 h-24 rounded-full border-4 border-dashed border-purple-600 flex items-center justify-center hover:bg-purple-100 md:w-24 md:h-24">
                <span className="text-sm text-gray-500">Upload Photo</span>
              </div>
            )}
          </label>
        </div>

        <div className="w-full md:w-2/6 pt-10 pl-5 bg-purple-300 mr-2">
          <h2 className="text-xl font-bold text-purple-700 mb-2 md:text-2xl">User Details</h2>
          <div className="space-y-1 text-gray-700">
            <p><strong>Name:</strong> {user?.name || 'Loading...'}</p>
            <p><strong>Email:</strong> {user?.email || 'Loading...'}</p>
            <p><strong>Phone:</strong> {user?.phone || 'Loading...'}</p>
            <p><strong>Address:</strong> {user?.address || 'Loading...'}</p>
          </div>
        </div>

        <div className="w-full md:w-3/6 p-4 border-l border-gray-200 bg-purple-200">
          <h2 className="text-xl font-bold text-purple-700 mb-2 md:text-2xl">Additional Info</h2>
          <div className="space-y-1 text-gray-700">
            <p><strong>Membership:</strong> Premium</p>
            <p><strong>Joined:</strong> Jan 2023</p>
            <p><strong>Goals:</strong> Weight Loss, Strength</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2 p-4 border-r border-gray-200 overflow-auto">
          <h3 className="text-lg font-semibold text-purple-700 mb-2 md:text-xl">Workout Duration Stats</h3>
          <WorkoutDurationStats />
        </div>

        <div className="w-full md:w-1/2 p-4 overflow-auto">
          <h3 className="text-lg font-semibold text-purple-700 mb-2 md:text-xl">Workout Calories Stats</h3>
          <WorkoutCaloriesStats />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
