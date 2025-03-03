"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useRef } from "react";
import { useUserStore } from "../app/store/useUserStore";
import { fetchStreakMonth, fetchWorkoutDates } from "../services/WorkoutAPI";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import { Workout } from "../app/types";
import { useGoalStore } from "@/app/store/useGoalStore";
import { FaBars, FaTimes, FaDumbbell, FaBullseye, FaCalendarAlt, FaFireAlt, FaUser } from "react-icons/fa";

import {
  NAVBAR_TITLE,
  WORKOUTS,
  FITNESS_GOALS_TITLE,
  VIEW_WORKOUTS,
  ADD_WORKOUT_TITLE,
  VIEW_FITNESS_GOALS,
  ADD_FITNESS_GOAL_TITLE,
  LOGOUT_BUTTON,
  LOGIN_BUTTON,
  SIGNUP_BUTTON,
} from "../constants/constants";

const Navbar: React.FC = () => {
  const [token, setToken] = useState<string>("");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isWorkoutsOpen, setIsWorkoutsOpen] = useState<boolean>(false);
  const [isGoalsOpen, setIsGoalsOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const { user, setUser } = useUserStore();
  const { workouts } = useWorkoutStore();
  const router = useRouter();

  const [streak, setStreak] = useState<number>(0);
  const [workoutDates, setWorkoutDates] = useState<Workout[]>([]);

  const { setFormData } = useWorkoutStore();
  const { setFormGoalData } = useGoalStore();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken") || "";
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (user && token) {
      const fetchStreak = async () => {
        const currStreak: number | { streak: number } = await fetchStreakMonth(token);
        console.log("Fetched Streak:", currStreak);
        setStreak(typeof currStreak === "object" ? currStreak.streak : currStreak);
      };

      const fetchDates = async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;

        const allDates: Workout[] = await fetchWorkoutDates(token, year, month);
        const filteredDates = allDates.filter((workout) => {
          const workoutMonth = new Date(workout.workout_date).getMonth() + 1;
          return workoutMonth === month;
        });

        setWorkoutDates(filteredDates);
      };

      fetchStreak();
      fetchDates();
    }
  }, [user, workouts,token]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    router.push("/login");
  };

  const getCurrentMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsWorkoutsOpen(false);
    setIsGoalsOpen(false);
    setIsProfileOpen(false);
    setIsCalendarOpen(false);
  };

  const toggleWorkouts = () => {
    setIsWorkoutsOpen(!isWorkoutsOpen);
    setIsGoalsOpen(false);
    setIsProfileOpen(false);
    setIsCalendarOpen(false);
  };

  const toggleGoals = () => {
    setIsGoalsOpen(!isGoalsOpen);
    setIsWorkoutsOpen(false);
    setIsProfileOpen(false);
    setIsCalendarOpen(false);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsWorkoutsOpen(false);
    setIsGoalsOpen(false);
    setIsCalendarOpen(false);
  };

  const toggleCalendar = () => {
    console.log("Toggle Calendar Clicked");
    setIsCalendarOpen((prev) => {
      const newState = !prev;
      console.log("New State:", newState);
      return newState;
    });
    setIsWorkoutsOpen(false);
    setIsGoalsOpen(false);
    setIsProfileOpen(false);
  };

  useEffect(() => {
    console.log("isCalendarOpen:", isCalendarOpen);
  }, [isCalendarOpen]);
  
  

  const handleAddWorkoutClick = () => {
    setFormData(null);
    setIsWorkoutsOpen(false); // Close the dropdown
  };

  const handleAddGoalClick = () => {
    setFormGoalData(null);
    setIsGoalsOpen(false); // Close the dropdown
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWorkoutsOpen(false);
        setIsGoalsOpen(false);
        setIsProfileOpen(false);
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-primary p-4 mb-4 relative z-50" ref={dropdownRef}>
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">{NAVBAR_TITLE}</Link>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <div
          className={`flex flex-col md:flex-row md:items-center space-y-2 md:space-y-0 md:space-x-4 absolute md:static bg-primary md:bg-transparent w-full md:w-auto left-0 md:pl-0 pl-4 transition-all duration-300 ease-in-out ${
            isMenuOpen ? "top-16" : "top-[-490px]"
          } z-50`}
        >
          {user ? (
            <>
              <div className="relative">
                <button
                  onClick={toggleWorkouts}
                  className="text-white hover:bg-primary px-4 py-2 rounded-lg flex items-center"
                >
                  <FaDumbbell className="mr-2" />
                  {WORKOUTS}
                </button>
                {isWorkoutsOpen && (
                  <div className="absolute left-0 bg-white text-black shadow-lg rounded-lg w-48 z-50">
                    <Link href="/workout-lists" className="block px-4 py-2 hover:bg-tertiary" onClick={() => setIsWorkoutsOpen(false)}>
                      {VIEW_WORKOUTS}
                    </Link>
                    <Link onClick={handleAddWorkoutClick} href="/workout-form" className="block px-4 py-2 hover:bg-hover">
                      {ADD_WORKOUT_TITLE}
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={toggleGoals}
                  className="text-white hover:bg-primary px-4 py-2 rounded-lg flex items-center"
                >
                  <FaBullseye className="mr-2" />
                  {FITNESS_GOALS_TITLE}
                </button>
                {isGoalsOpen && (
                  <div className="absolute left-0 bg-white text-black shadow-lg rounded-lg w-48 z-50">
                    <Link href="/goal-lists" className="block px-4 py-2 hover:bg-tertiary" onClick={() => setIsGoalsOpen(false)}>
                      {VIEW_FITNESS_GOALS}
                    </Link>
                    <Link href="/goal-form" className="block px-4 py-2 hover:bg-tertiary" onClick={handleAddGoalClick}>
                      {ADD_FITNESS_GOAL_TITLE}
                    </Link>
                  </div>
                )}
              </div>

              <div className="relative">
                <button
                  onClick={toggleCalendar}
                  className="text-white hover:bg-primary px-4 py-2 rounded-lg flex items-center"
                >
                  <FaCalendarAlt className="mr-2" /> Workout Calendar
                </button>
                {isCalendarOpen && (
                <div className="fixed inset-0 bg-secondary bg-opacity-75 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md">
                    <h2 className="text-xl font-bold text-center mb-4">Workouts This Month</h2>
                    <div className="grid grid-cols-7 gap-2">
                      {getCurrentMonthDays().map((day) => {
                        const dateStr = day.toLocaleDateString("en-CA");
                        const isWorkoutDay = workoutDates.some(
                          (workout) => workout.workout_date === dateStr
                        );
                        const isFutureDate = day > new Date();
                        const workoutCount = workoutDates.filter(
                          (workout) => workout.workout_date === dateStr
                        ).length;

                        return (
                          <div
                            key={dateStr}
                            className={`w-10 h-10 flex items-center justify-center rounded-full ${
                              isFutureDate
                                ? "bg-gray-400 text-white"
                                : workoutCount > 1
                                ? "bg-green-900 text-white"
                                : isWorkoutDay
                                ? "bg-green-600 text-white"
                                : "bg-red-400 text-white"
                            }`}
                          >
                            {day.getDate()}
                          </div>
                        );
                      })}
                    </div>
                    <button
                      onClick={() => setIsCalendarOpen(false)}
                      className="mt-4 text-primary hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}


              </div>

              <div className="text-white px-4 py-2 rounded-lg flex items-center">
                <FaFireAlt className="mr-2" />
                Streak: {streak} days
              </div>

              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="text-white hover:bg-primary px-4 py-2 rounded-lg flex items-center"
                >
                  <FaUser className="mr-2" />
                  {user && user.name ? user.name : "Profile"}
                </button>
                {isProfileOpen && (
                  <div className="absolute top-full left-0 mt-2 bg-white text-black shadow-lg rounded-lg min-w-32 z-50">
                    <Link href="/profile" className="block px-4 py-2 hover:bg-tertiary" onClick={() => setIsProfileOpen(false)}>
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-tertiary"
                    >
                      {LOGOUT_BUTTON}
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:bg-primary px-4 py-2 rounded-lg">
                {LOGIN_BUTTON}
              </Link>
              <Link href="/signup" className="text-white hover:bg-primary px-4 py-2 rounded-lg">
                {SIGNUP_BUTTON}
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

