'use server';

const API_BASE_URL = process.env.API_BASE_URL || '';

/**
 * Helper function to create headers with Authorization token
 */
const getHeaders = (token: string) => ({
  'Content-Type': 'application/json',
  Authorization: `Bearer ${token}`,
});

/**
 * Fetch all fitness goals
 */
export const getAllFitnessGoals = async (token: string) => {
  try {
    console.log('Fetching all fitness goals with token', token);
    const response = await fetch(`${API_BASE_URL}/api/goals/fitness`, {
      headers: getHeaders(token),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch fitness goals (${response.status} - ${response.statusText})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching fitness goals:', error);
    throw new Error('Unable to fetch fitness goals. Please try again later.');
  }
};

/**
 * Create a new fitness goal
 */
export const createFitnessGoal = async (token: string, goal: any) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/goals/fitness`, {
      method: 'POST',
      headers: getHeaders(token),
      body: JSON.stringify(goal),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create fitness goal (${response.status} - ${response.statusText})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating fitness goal:', error);
    throw new Error(
      'Unable to create fitness goal. Please check your input and try again.'
    );
  }
};

/**
 * Update a fitness goal by ID
 */
export const updateFitnessGoal = async (
  token: string,
  id: number | null,
  goal: any
) => {
  try {
    if (!id) throw new Error('Invalid goal ID provided');

    const response = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
      method: 'PATCH',
      headers: getHeaders(token),
      body: JSON.stringify(goal),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update fitness goal (${response.status} - ${response.statusText})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating fitness goal:', error);
    throw new Error('Unable to update fitness goal. Please try again.');
  }
};

/**
 * Delete a fitness goal by ID
 */
export const deleteFitnessGoal = async (token: string, id: number) => {
  try {
    if (!id) throw new Error('Invalid goal ID provided');

    const response = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
      method: 'DELETE',
      headers: getHeaders(token),
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete fitness goal (${response.status} - ${response.statusText})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error deleting fitness goal:', error);
    throw new Error('Unable to delete fitness goal. Please try again later.');
  }
};

/**
 * Fetch a single fitness goal by ID
 */
export const getSingleFitnessGoal = async (token: string, id: number) => {
  try {
    console.log('Fetching single fitness goal with token', token);
    const response = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
      headers: getHeaders(token),
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch single fitness goal (${response.status} - ${response.statusText})`
      );
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching single fitness goal:', error);
    throw new Error('Unable to fetch fitness goal. Please try again.');
  }
};
