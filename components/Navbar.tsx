"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import  {useUserStore}  from "../app/store/useUserStore";
// import { fetchSteak, fetchWorkoutDates } from "../services/WorkoutAPI";
import { useWorkoutStore } from "@/app/store/useWorkoutStore";
import { Workout } from "../app/types";

const Navbar: React.FC = () => {
  const { user, setUser } = useUserStore();
  const { workouts } = useWorkoutStore();
  const router = useRouter();

  const [streak, setStreak] = useState<number>(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [workoutDates, setWorkoutDates] = useState<Workout[]>([]);

  // useEffect(() => {
  //   if (user) {
  //     const fetchStreak = async () => {
  //       const currStreak: number | { streak: number } = await fetchSteak();
  //       console.log("Fetched Streak:", currStreak);
  //       setStreak(typeof currStreak === "object" ? currStreak.streak : currStreak);
  //     };

  //     const fetchDates = async () => {
  //       const today = new Date();
  //       const year = today.getFullYear();
  //       const month = today.getMonth() + 1;

  //       const allDates: Workout[] = await fetchWorkoutDates(year, month);
  //       const filteredDates = allDates.filter(workout => {
  //         const workoutMonth = new Date(workout.workout_date).getMonth() + 1;
  //         return workoutMonth === month;
  //       });

  //       setWorkoutDates(filteredDates);
  //     };

  //     fetchStreak();
  //     fetchDates();
  //   }
  // }, [user, workouts]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser({ 
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      profile_pic: ""});
    router.push("/login");
  };

  const getCurrentMonthDays = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    return Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1));
  };

  return (
    <nav className="bg-purple-600 p-4 mb-4">
      <div className="flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link href="/">NAVBAR</Link>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="relative group">
                <button className="text-white hover:bg-purple-500 px-4 py-2 rounded-lg">
                <i className="fa-solid fa-dumbbell mr-2"></i>WORKOUTS
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block z-50">
                  <Link href="/workout-lists" className="block px-4 py-2 hover:bg-gray-200">
                    VIEW WORKOUT
                  </Link>
                  <Link href="/workout-form" className="block px-4 py-2 hover:bg-gray-200">
                    ADD WORKOUT
                  </Link>
                </div>
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-purple-500 px-4 py-2 rounded-lg">
                <i className="fa-solid fa-bullseye mr-2"></i>FITNESS GOALS
                </button>
                <div className="absolute left-0 hidden bg-white text-black shadow-lg rounded-lg w-48 group-hover:block z-50">
                  <Link href="/fitnessViews" className="block px-4 py-2 hover:bg-gray-200">
                    VIEW FITNESS GOLAS
                  </Link>
                  <Link href="/fitnessFormPage" className="block px-4 py-2 hover:bg-gray-200">
                    ADD FITNESS GOALS
                  </Link>
                </div>
              </div>

              <div className="relative group">
  <button className="text-white hover:bg-purple-500 px-4 py-2 rounded-lg flex items-center">
    <i className="fa-solid fa-calendar-days mr-2"></i> Workout Calendar
  </button>

  <div
    className="absolute top-full mt-5 bg-white rounded-lg shadow-lg p-4 w-96 z-10 hidden group-hover:block"
    style={{ right: "-100px" }}
  >
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
            className={`w-10 h-10 flex items-center justify-center rounded-full
              ${isFutureDate
                ? "bg-gray-400 text-white"
                : workoutCount > 1
                  ? "bg-green-900 text-white"
                  : isWorkoutDay
                    ? "bg-green-600 text-white"
                    : "bg-red-400 text-white"}`}
          >
            {day.getDate()}
          </div>
        );
      })}
    </div>
  </div>
</div>


              <div className="text-white px-4 py-2 rounded-lg flex items-center">
              <i className="fa-solid fa-fire-flame-curved mr-2"></i>
              Streak: {streak} days
              </div>

              <div className="relative group">
                <button className="text-white hover:bg-purple-500 px-4 py-2 rounded-lg flex items-center">
                  <i className="fa-solid fa-user mr-2"></i>
                  {user && user.name ? user.name : "Profile"}
                </button>
                <div className="absolute right-1 hidden bg-white text-black shadow-lg rounded-lg min-w-32 group-hover:block">
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-200">
                    View Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    LOGOUT
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-white hover:bg-purple-500 px-4 py-2 rounded-lg">
                LOGIN
              </Link>
              <Link href="/signup" className="text-white hover:bg-purple-500 px-4 py-2 rounded-lg">
                SIGNUP
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;