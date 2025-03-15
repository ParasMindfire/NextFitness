"use client";

import React, { useEffect, useState } from 'react';
import { useUserStore } from '../../store/useUserStore';
import { fetchWorkoutDates } from '../../../services/WorkoutAPI';
import { Workout } from '../../types';
import { FaCalendarAlt } from 'react-icons/fa';
import UserProgressChart from '../../../components/UserProgressChart';
import GlobalConsistencyChart from '../../../components/GlobalConsistencyChart';

const WorkoutCalendarPage: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const [workoutDates, setWorkoutDates] = useState<Workout[]>([]);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);

  const { user } = useUserStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken') || '';
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (user && token) {
      const fetchDates = async () => {
        const allDates: Workout[] = await fetchWorkoutDates(token, selectedYear, selectedMonth);
        const filteredDates = allDates.filter((workout) => {
          const workoutMonth = new Date(workout.workout_date).getMonth() + 1;
          return workoutMonth === selectedMonth;
        });

        setWorkoutDates(filteredDates);
      };

      fetchDates();
    }
  }, [user, token, selectedYear, selectedMonth]);

  const getCurrentMonthDays = () => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    return Array.from(
      { length: daysInMonth },
      (_, i) => new Date(selectedYear, selectedMonth - 1, i + 1)
    );
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(event.target.value));
  };

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(Number(event.target.value));
  };

  return (
    <div className="flex flex-col md:flex-row p-4 space-y-6 md:space-y-0 md:space-x-4">
      {/* History Section */}
      <div className="w-full md:w-1/2 p-4 bg-white shadow rounded-lg space-y-4">
        <h2 className="text-xl font-bold text-center mb-4">Workout History</h2>
        <div className="flex justify-center space-x-4">
          <select
            className="p-2 border rounded"
            value={selectedYear}
            onChange={handleYearChange}
          >
            {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          <select
            className="p-2 border rounded"
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
              <option key={month} value={month}>
                {new Date(2000, month - 1).toLocaleString('default', { month: 'long' })}
              </option>
            ))}
          </select>
        </div>

        {/* Calendar Section */}
        <div>
          <h2 className="text-xl font-bold text-center mb-4 flex items-center justify-center">
            <FaCalendarAlt className="mr-2" /> Workouts This Month
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 sm:gap-4">
            {getCurrentMonthDays().map((day) => {
              const dateStr = day.toLocaleDateString('en-CA');
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
                  className={`p-3 text-center rounded-lg shadow text-xs sm:text-sm md:text-base font-semibold ${
                    isFutureDate
                      ? 'bg-gray-300 text-gray-500'
                      : workoutCount > 1
                        ? 'bg-blue-500 text-white'
                        : isWorkoutDay
                          ? 'bg-green-500 text-white'
                          : 'bg-red-500 text-white'
                  }`}
                >
                  <div className="font-bold text-lg">{day.getDate()}</div>
                  <div className="text-xs sm:text-sm">
                    {workoutCount > 1 ? `${workoutCount} Workouts` : isWorkoutDay ? '1 Workout' : 'No Workout'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="w-full md:w-1/2 space-y-6">
        <UserProgressChart />
        <GlobalConsistencyChart />
      </div>
    </div>
  );
};

export default WorkoutCalendarPage;
