"use server";

import {User} from "../app/types"

// services/auth.ts
export const loginUser = async (data: { email: string; password: string }) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Login failed");
  return result;
};

export const signupUser = async (data: {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}) => {
  console.log("kya daat aaya singup ", data);

  const response = await fetch(`${process.env.API_BASE_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || "Login failed");
  return result;
};


export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${process.env.API_BASE_URL}/api/users`, {
      method: "GET",
      cache: "no-store", // Ensures fresh data
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getSingleUser = async (): Promise<User> => {
  try {
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

    const response = await fetch(`${process.env.API_BASE_URL}/api/users/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const users = await response.json();
    return users[0]; // Assuming API returns an array
  } catch (error) {
    console.error("Error fetching single user:", error);
    throw error;
  }
};

