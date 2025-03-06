"use client";

import { useEffect, useState } from "react";
import { useWorkoutStore } from "../app/store/useWorkoutStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import { WorkoutData } from "../app/types";
import {
  WORKOUT_PROGRESS,
  TRACK_WORKOUT_DURATION,
  WEEKLY_PROGRESS,
  MONTHLY_PROGRESS,
  YEARLY_PROGRESS,
} from "../constants/constants";

// This page displays workout duration statistics.
export const WorkoutDurationStats = () => {
  const { workouts } = useWorkoutStore();
  const [weeklyData, setWeeklyData] = useState<WorkoutData[]>([]);
  const [monthlyData, setMonthlyData] = useState<WorkoutData[]>([]);
  const [yearlyData, setYearlyData] = useState<WorkoutData[]>([]);

  // Update workout duration data when workouts change
  useEffect(() => {
    if (workouts.length > 0) {
      const today = new Date();
      const weekly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setDate(today.getDate() - 7)));
      const monthly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setMonth(today.getMonth() - 1)));
      const yearly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setFullYear(today.getFullYear() - 1)));

      setWeeklyData(weekly.map(w => ({ date: w.workout_date, duration: w.duration })));
      setMonthlyData(monthly.map(w => ({ date: w.workout_date, duration: w.duration })));
      setYearlyData(yearly.map(w => ({ date: w.workout_date, duration: w.duration })));
    }
  }, [workouts]);

  return (
    <div className="mt-6">
      {/* Title and description for workout duration stats */}
      <h2 className="text-2xl font-bold text-center md:text-3xl">{WORKOUT_PROGRESS}</h2>
      <p className="text-gray-600 text-center">{TRACK_WORKOUT_DURATION}</p>

      {(() => {
        const today = dayjs().format("YYYY-MM-DD");
        const lastWeek = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM-DD");
        const lastYear = dayjs().subtract(365, "day").format("YYYY-MM-DD");

        return (
          <>
            {/* Weekly workout duration chart */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-blue-600 md:text-xl">{WEEKLY_PROGRESS}</h3>
              <p className="text-sm text-center text-gray-500">
                Data from <strong>{lastWeek}</strong> to <strong>{today}</strong>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="duration" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly workout duration chart */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-green-600 md:text-xl">{MONTHLY_PROGRESS}</h3>
              <p className="text-sm text-center text-gray-500">
                Data from <strong>{lastMonth}</strong> to <strong>{today}</strong>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="duration" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Yearly workout duration chart */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-yellow-600 md:text-xl">{YEARLY_PROGRESS}</h3>
              <p className="text-sm text-center text-gray-500">
                Data from <strong>{lastYear}</strong> to <strong>{today}</strong>
              </p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="duration" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      })()}
    </div>
  );
};
