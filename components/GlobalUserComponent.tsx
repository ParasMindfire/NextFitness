"use client"

import React, { useEffect, useState } from "react";
import { getAllWorkouts } from '../services/WorkoutAPI';
import { workoutByAll } from '../app/types';

const UserGoals: React.FC = () => {
    const [usersWorkouts, setUsersWorkouts] = useState<workoutByAll[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const usersData: workoutByAll[] = await getAllWorkouts();
          // Limit the displayed cards to 7 (adjust as needed)
          setUsersWorkouts(usersData.slice(0, 7));
        } catch (err) {
          setError("Failed to fetch user goals");
        } finally {
          setLoading(false);
        }
      };
      fetchUsers();
    }, []);

    if (loading) return <p className="text-center text-tertiary">Loading user goals...</p>;
    if (error) return <p className="text-center text-error">{error}</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center mb-4 text-primary">Community Goals</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usersWorkouts.map((user, id) => (
        <div
          key={id}
          className="border border-tertiary p-4 rounded-lg shadow hover:shadow-xl transition transform hover:scale-105"
        >
          <h3 className="text-xl font-semibold text-primary mb-2">{user.name}</h3>
          <p className="text-secondary mb-1">
            <strong>Exercise Type:</strong> {user.excercise_type}
          </p>
          <p className="text-secondary mb-1">
            <strong>Duration:</strong> {user.duration} mins
          </p>
          <p className="text-secondary mb-1">
            <strong>Calories Burned:</strong> {user.calories_burned} kcal
          </p>
        </div>
         ))} 
      </div>
    </div>
  );
};

export default UserGoals;
