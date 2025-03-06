"use client";

import React, { useEffect, useState } from "react";
import { getSingleUser } from "../services/UserAPI";
import { User } from "../app/types";
import { useWorkoutStore } from "../app/store/useWorkoutStore";

const UserProfile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const { fetchWorkouts } = useWorkoutStore();

  // Fetch user and workouts on component mount
  useEffect(() => {
    const token: any = localStorage.getItem("accessToken");
    fetchWorkouts(token);
    fetchUser(token);
  }, []);

  // Fetch user data from API
  const fetchUser = async (token: string) => {
    try {
      const incomingUser = await getSingleUser(token);
      setUser(incomingUser);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4 space-y-4 md:space-y-0">
      {/* Profile picture section */}
      <div className="flex justify-center items-center w-full md:w-1/6 p-4 bg-white mr-2">
        <label htmlFor="photo-upload" className="cursor-pointer relative">
          {user?.profile_pic ? (
            <img
              src={`/uploads/${user?.profile_pic}`}
              className="w-24 h-24 rounded-full object-cover border-4 border-primary md:w-24 md:h-24"
              alt="Profile"
            />
          ) : (
            <div className="w-24 h-24 rounded-full border-4 border-dashed border-primary flex items-center justify-center hover:bg-hover md:w-24 md:h-24">
              <span className="text-sm text-gray-500">Upload Photo</span>
            </div>
          )}
        </label>
      </div>

      {/* User details section */}
      <div className="w-full md:w-2/6 p-10 pl-5 bg-primary mr-2">
        <h2 className="text-xl font-bold text-white mb-2 md:text-2xl">User Details</h2>
        <div className="space-y-1 text-white">
          <p><strong>Name:</strong> {user?.name || "Loading..."}</p>
          <p><strong>Email:</strong> {user?.email || "Loading..."}</p>
          <p><strong>Phone:</strong> {user?.phone || "Loading..."}</p>
          <p><strong>Address:</strong> {user?.address || "Loading..."}</p>
        </div>
      </div>

      {/* Additional info section */}
      <div className="w-full md:w-3/6 p-10 border-l border-tertiary bg-secondary">
        <h2 className="text-xl font-bold text-white mb-2 md:text-2xl">Additional Info</h2>
        <div className="space-y-1 text-white">
          <p><strong>Membership:</strong> Premium</p>
          <p><strong>Joined:</strong> Jan 2023</p>
          <p><strong>Goals:</strong> Weight Loss, Strength</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
