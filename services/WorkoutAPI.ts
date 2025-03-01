"use server"

export const getAllWorkouts = async () => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts`, { cache: "no-store" });
  if (!response.ok) throw new Error("Failed to fetch workouts");
  return response.json();
};

export const getUserWorkouts = async (token: string) => {
  console.log("inside getUser workou API with token",token);
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data=await response.json();
  // console.log("getUser workou API with response ",data);
  if (!response.ok) throw new Error("Failed to fetch user workouts");
  return data;
};

export const createWorkout = async (token: string, workout: any) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(workout),
  });
  if (!response.ok) throw new Error("Failed to create workout");
  return response.json();
};

export const updateWorkout = async (token: string, workout: any) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(workout),
  });
  if (!response.ok) throw new Error("Failed to update workout");
  return response.json();
};

export const deleteWorkout = async (token: string, workout_id: number) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/workouts/work`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ workout_id }),
  });
  if (!response.ok) throw new Error("Failed to delete workout");
  return response.json();
};

// export const fetchStreak = async (token: string) => {
//   const response = await fetch(`${process.env.API_BASE_URL}/streaks`, {
//     headers: { Authorization: `Bearer ${token}` },
//     cache: "no-store",
//   });
//   if (!response.ok) throw new Error("Failed to fetch streak");
//   return response.json();
// };

// export const fetchWorkoutDates = async (token: string, year: any, month: any) => {
//   const response = await fetch(`${process.env.API_BASE_URL}/days?year=${year}&month=${month}`, {
//     headers: { Authorization: `Bearer ${token}` },
//     cache: "no-store",
//   });
//   if (!response.ok) throw new Error("Failed to fetch workout dates");
//   return response.json();
// };

// export const uploadUserPhoto = async (token: string, file: File, email: string) => {
//   const formData = new FormData();
//   formData.append("photo", file);
//   formData.append("email", email);

//   const response = await fetch(`${process.env.API_BASE_URL}/users/photo`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` },
//     body: formData,
//   });

//   if (!response.ok) throw new Error("Photo upload failed");
//   return response.json();
// };
