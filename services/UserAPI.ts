'use server';

import { User } from '../app/types';

const API_BASE_URL = process.env.API_BASE_URL || '';

// Function to log in a user
export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("result kya aya login services ",result);
    
    if (!response.ok) throw new Error(result.message || 'Login failed');

    return result;
  } catch (error) {
    console.error('Error logging in:', error);
    throw new Error('Login failed');
  }
};

// Function to sign up a new user
export const signupUser = async (data: {
  email: string;
  password: string;
  name: string;
  phone: string;
  address: string;
}) => {
  try {
    console.log('Signup request data:', data);

    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Signup failed');

    console.log("kya result aya ",result);

    return result;
  } catch (error) {
    console.error('Error signing up:', error);
    throw new Error('Signup failed');
  }
};

// Function to get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch users');

    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Function to get a single user by token
export const getSingleUser = async (token: string): Promise<User> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/users/user`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    });

    if (!response.ok) throw new Error('Failed to fetch user');

    const users = await response.json();
    return users; // Assuming API returns an array
  } catch (error) {
    console.error('Error fetching single user:', error);
    throw error;
  }
};

// Function to upload a user's profile photo
export const uploadUserPhoto = async (
  token: string,
  file: File,
  email: string
) => {
  try {
    const formData = new FormData();
    formData.append('photo', file);
    formData.append('email', email);

    const response = await fetch(`${API_BASE_URL}/users/photo`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!response.ok) throw new Error('Photo upload failed');

    return await response.json();
  } catch (error) {
    console.error('Error uploading photo:', error);
    throw error;
  }
};
