"use client"

import axiosInstance from "./AuthInterceptior";

// Fetches all fitness goals for the logged-in user
export const getAllFitnessGoals = async () => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    const response = await axiosInstance.get(`${process.env.API_BASE_URL}/api/goals/fitness`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching fitness goals:", error);
    throw error;
  }
};

// Creates a new fitness goal for the user
export const createFitnessGoal = async (goal: any) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    await axiosInstance.post(`${process.env.API_BASE_URL}/api/goals/fitness`, goal, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error creating fitness goal:", error);
    throw error;
  }
};

// Updates an existing fitness goal
export const updateFitnessGoal = async (id: any,goal:any) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    await axiosInstance.patch(`${process.env.API_BASE_URL}/api/goals/${id}`, goal, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error updating fitness goal:", error);
    throw error;
  }
};

// Deletes a fitness goal by its ID
export const deleteFitnessGoal = async (id: number) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    await axiosInstance.delete(`${process.env.API_BASE_URL}/api/goals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error("Error deleting fitness goal:", error);
    throw error;
  }
};

// Fetches a single fitness goal by its ID
export const getSingleFitnessGoal = async (id: number) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) throw new Error("No access token found");

    const response = await axiosInstance.get(`${process.env.API_BASE_URL}/goals/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching single fitness goal:", error);
    throw error;
  }
};
