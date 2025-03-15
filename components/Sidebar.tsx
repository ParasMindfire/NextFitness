"use client"

import React from 'react';
import Link from 'next/link';
import {
  FaTimes,
  FaDumbbell,
  FaBullseye,
  FaCalendarAlt,
  FaFireAlt,
  FaUser,
} from 'react-icons/fa';
import { useUserStore } from '../app/store/useUserStore';
import { useWorkoutStore } from '@/app/store/useWorkoutStore';
import { useGoalStore } from '@/app/store/useGoalStore';
import {
  WORKOUTS,
  FITNESS_GOALS_TITLE,
  VIEW_WORKOUTS,
  ADD_WORKOUT_TITLE,
  VIEW_FITNESS_GOALS,
  ADD_FITNESS_GOAL_TITLE,
  LOGOUT_BUTTON,
  LOGIN_BUTTON,
  SIGNUP_BUTTON,
} from '../constants/constants';
import router from 'next/router';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  streak: number;
  workoutDates: any[];
  getCurrentMonthDays: () => Date[];
  setIsCalendarOpen: React.Dispatch<React.SetStateAction<boolean>>; // Add this line
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  streak,
  workoutDates,
  getCurrentMonthDays,
  setIsCalendarOpen, // Add this line
}) => {
  const { user, setUser } = useUserStore();
  const { setFormData } = useWorkoutStore();
  const { setFormGoalData } = useGoalStore();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    router.push('/login');
    localStorage.removeItem('user-storage');
    onClose();
  };

  const handleAddWorkoutClick = () => {
    setFormData(null);
    onClose();
  };

  const handleAddGoalClick = () => {
    setFormGoalData(null);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 bg-primary bg-opacity-90 z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-600">
        <div className="text-white text-2xl font-bold">Navbar Title</div>
        <button onClick={onClose} className="text-white focus:outline-none">
          <FaTimes size={24} />
        </button>
      </div>
      <div className="p-4">
        {user ? (
          <>
            <div className="mb-4">
              <Link href="/workout-lists" className="block text-white px-4 py-2 rounded-lg hover:bg-tertiary">
                <FaDumbbell className="mr-2 inline" />
                {VIEW_WORKOUTS}
              </Link>
              <Link
                href="/workout-form"
                className="block text-white px-4 py-2 rounded-lg hover:bg-tertiary"
                onClick={handleAddWorkoutClick}
              >
                <FaDumbbell className="mr-2 inline" />
                {ADD_WORKOUT_TITLE}
              </Link>
            </div>
            <div className="mb-4">
              <Link href="/goal-lists" className="block text-white px-4 py-2 rounded-lg hover:bg-tertiary">
                <FaBullseye className="mr-2 inline" />
                {VIEW_FITNESS_GOALS}
              </Link>
              <Link
                href="/goal-form"
                className="block text-white px-4 py-2 rounded-lg hover:bg-tertiary"
                onClick={handleAddGoalClick}
              >
                <FaBullseye className="mr-2 inline" />
                {ADD_FITNESS_GOAL_TITLE}
              </Link>
            </div>
            <div className="mb-4">
              <button
                onClick={() => setIsCalendarOpen(true)}
                className="text-white w-full px-4 py-2 rounded-lg hover:bg-tertiary flex items-center"
              >
                <FaCalendarAlt className="mr-2" /> Workout Calendar
              </button>
            </div>
            <div className="mb-4">
              <div className="text-white px-4 py-2 rounded-lg flex items-center">
                <FaFireAlt className="mr-2" />
                Streak: {streak} days
              </div>
            </div>
            <div className="mb-4">
              <Link href="/profile" className="block text-white px-4 py-2 rounded-lg hover:bg-tertiary">
                <FaUser className="mr-2 inline" />
                {user.name}
              </Link>
              <button
                onClick={handleLogout}
                className="block text-white w-full px-4 py-2 rounded-lg hover:bg-tertiary text-left"
              >
                {LOGOUT_BUTTON}
              </button>
            </div>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="block text-white px-4 py-2 rounded-lg hover:bg-tertiary"
              onClick={onClose}
            >
              {LOGIN_BUTTON}
            </Link>
            <Link
              href="/signup"
              className="block text-white px-4 py-2 rounded-lg hover:bg-tertiary"
              onClick={onClose}
            >
              {SIGNUP_BUTTON}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
