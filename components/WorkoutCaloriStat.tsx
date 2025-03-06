"use client";

import { useEffect, useState } from "react";
import { useWorkoutStore } from "../app/store/useWorkoutStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import dayjs from "dayjs";
import { CaloriesData } from "../app/types";
import {
  WEEKLY_CALORIES_BURNED,
  MONTHLY_CALORIES_BURNED,
  YEARLY_CALORIES_BURNED,
  CALORIES_BURNED_PROGRESS,
  CALORIE_STATS_DESCRIPTION
} from "../constants/constants";

// This page shows the statistics related to the calories burned during workouts.
export const WorkoutCaloriesStats = () => {
  const { workouts } = useWorkoutStore();
  const [weeklyData, setWeeklyData] = useState<CaloriesData[]>([]);
  const [monthlyData, setMonthlyData] = useState<CaloriesData[]>([]);
  const [yearlyData, setYearlyData] = useState<CaloriesData[]>([]);

  // Update calories data when workouts change
  useEffect(() => {
    if (workouts.length > 0) {
      const today = new Date();
      const weekly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setDate(today.getDate() - 7)));
      const monthly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setMonth(today.getMonth() - 1)));
      const yearly = workouts.filter(workout => new Date(workout.workout_date) >= new Date(today.setFullYear(today.getFullYear() - 1)));

      setWeeklyData(weekly.map(w => ({ date: w.workout_date, calories: w.calories_burned })));
      setMonthlyData(monthly.map(w => ({ date: w.workout_date, calories: w.calories_burned })));
      setYearlyData(yearly.map(w => ({ date: w.workout_date, calories: w.calories_burned })));
    }
  }, [workouts]);

  return (
    <div className="mt-6">
      {/* Title and description for the calories burned stats */}
      <h2 className="text-2xl font-bold text-center md:text-3xl">{CALORIES_BURNED_PROGRESS}</h2>
      <p className="text-gray-600 text-center">{CALORIE_STATS_DESCRIPTION}</p>

      {(() => {
        const today = dayjs().format("YYYY-MM-DD");
        const lastWeek = dayjs().subtract(7, "day").format("YYYY-MM-DD");
        const lastMonth = dayjs().subtract(1, "month").format("YYYY-MM-DD");
        const lastYear = dayjs().subtract(365, "day").format("YYYY-MM-DD");

        return (
          <>
            {/* Weekly calories burned chart */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-red-600 md:text-xl">{WEEKLY_CALORIES_BURNED}</h3>
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
                  <Line type="monotone" dataKey="calories" stroke="#FF5733" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Monthly calories burned chart */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-purple-600 md:text-xl">{MONTHLY_CALORIES_BURNED}</h3>
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
                  <Line type="monotone" dataKey="calories" stroke="#A020F0" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Yearly calories burned chart */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-center text-orange-600 md:text-xl">{YEARLY_CALORIES_BURNED}</h3>
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
                  <Line type="monotone" dataKey="calories" stroke="#FF8C00" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        );
      })()}
    </div>
  );
};
