import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { Request } from 'node-fetch';
import bcrypt from 'bcryptjs';
import * as UserRepository from '@/lib/repository/UserRepo'; // Ensure correct import path
import { POST } from '../../app/api/auth/route'; // Adjust the path as necessary

// Mock the UserRepository
vi.mock('@/lib/repository/UserRepo', () => ({
  getUserByEmail: vi.fn(),
}));

// Mock environment variables
vi.stubEnv('JWT_SECRET', 'your_secret_key_here');

describe('API /auth Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return 200 and login details on successful login', async () => {
    const mockUser = {
      user_id: 8,
      name: "Paras Singh Bhatia",
      email: "2025@gmail.com",
      password: bcrypt.hashSync("Paras@123", 10),
      phone: "07978018271",
      address: "RHR Hostel,Ghatikia, Kalinga Nagar",
      profile_pic: "1740387138955-Screenshot_2025-01-21-15-12-18-67_92460851df6f172a4592fca41cc2d2e6.jpg"
    };

    // Mock the repository to return the mock user
    vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[mockUser],[]]);

    const req = new Request('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Use an object literal for headers
      body: JSON.stringify({ email: "2025@gmail.com", password: "Paras@123" })
    });

    const res = await POST(req as any);
    const responseJson = await res.json();

    console.log("response aya ? ",responseJson);

    expect(res.status).toBe(200);
    expect(responseJson).toHaveProperty('message', 'Login successful');
    expect(responseJson).toHaveProperty('accessToken');
    expect(responseJson.user).toEqual(mockUser);
  });

  it('should return 400 if email or password is missing', async () => {
    const req = new Request('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Use an object literal for headers
      body: JSON.stringify({ email: "2025@gmail.com" }) // missing password
    });

    const res = await POST(req as any);
    const responseJson = await res.json();

    expect(res.status).toBe(400);
    expect(responseJson).toEqual({ error: "Enter All The Fields" });
  });

  it('should return 404 if user is not found', async () => {
    vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[],[]]);

    const req = new Request('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Use an object literal for headers
      body: JSON.stringify({ email: "nonexistent@gmail.com", password: "password" })
    });

    const res = await POST(req as any);
    const responseJson = await res.json();

    expect(res.status).toBe(404);
    expect(responseJson).toEqual({ error: "User not found" });
  });

  it('should return 401 if password is incorrect', async () => {
    const mockUser = {
      user_id: 8,
      name: "Paras Singh Bhatia",
      email: "2025@gmail.com",
      password: bcrypt.hashSync("WrongPassword", 10), // Incorrect password hash
      phone: "07978018271",
      address: "RHR Hostel,Ghatikia, Kalinga Nagar",
      profile_pic: "1740387138955-Screenshot_2025-01-21-15-12-18-67_92460851df6f172a4592fca41cc2d2e6.jpg"
    };

    vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[mockUser],[]]);

    const req = new Request('http://localhost:3000/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // Use an object literal for headers
      body: JSON.stringify({ email: "2025@gmail.com", password: "Paras@123" })
    });

    const res = await POST(req as any);
    const responseJson = await res.json();

    expect(res.status).toBe(401);
    expect(responseJson).toEqual({ error: "Invalid Credentials" });
  });
});
