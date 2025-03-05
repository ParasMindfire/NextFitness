"use server";

// Function to get all workouts
export const getAllWorkouts = async () => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch workouts");
  return response.json();
};

// Function to get workouts of a specific user
export const getUserWorkouts = async (token: string) => {
  console.log("Inside getUserWorkouts API with token", token);
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch user workouts");
  return data;
};

// Function to create a new workout
export const createWorkout = async (token: string, workout: any) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(workout),
  });

  if (!response.ok) throw new Error("Failed to create workout");
  return response.json();
};

// Function to update an existing workout
export const updateWorkout = async (token: string, workout: any) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(workout),
  });

  if (!response.ok) throw new Error("Failed to update workout");
  return response.json();
};

// Function to delete a workout
export const deleteWorkout = async (token: string, workout_id: number) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ workout_id }),
  });

  if (!response.ok) throw new Error("Failed to delete workout");
  return response.json();
};

// Function to fetch streak data for the month
export const fetchStreakMonth = async (token: string) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/streaks`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch streak");
  return response.json();
};

// Function to fetch workout dates for a specific month and year
export const fetchWorkoutDates = async (token: string, year: any, month: any) => {
  const url = new URL(`${process.env.API_BASE_URL}/api/days`);
  url.searchParams.append("year", year);
  url.searchParams.append("month", month);

  const response = await fetch(url.toString(), {
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });

  if (!response.ok) throw new Error("Failed to fetch workout dates");
  return response.json();
};
