"use server"

export const getAllFitnessGoals = async (token: string) => {
  console.log("Fetching all fitness goals with token", token);
  const response = await fetch(`${process.env.API_BASE_URL}/api/goals/fitness`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch fitness goals");
  return data;
};

export const createFitnessGoal = async (token: string, goal: any) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/goals/fitness`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(goal),
  });
  if (!response.ok) throw new Error("Failed to create fitness goal");
  return response.json();
};

export const updateFitnessGoal = async (token: string, id: number | null, goal: any) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/goals/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(goal),
  });
  if (!response.ok) throw new Error("Failed to update fitness goal");
  return response.json();
};

export const deleteFitnessGoal = async (token: string, id: number) => {
  const response = await fetch(`${process.env.API_BASE_URL}/api/goals/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ id }),
  });
  if (!response.ok) throw new Error("Failed to delete fitness goal");
  return response.json();
};

export const getSingleFitnessGoal = async (token: string, id: number) => {
  console.log("Fetching single fitness goal with token", token);
  const response = await fetch(`${process.env.API_BASE_URL}/api/goals/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  const data = await response.json();
  if (!response.ok) throw new Error("Failed to fetch single fitness goal");
  return data;
};