import { describe, it, expect, afterEach, vi } from 'vitest';
import { Request } from 'node-fetch';
import * as UserRepository from '@/lib/repository/UserRepo'; // Ensure correct import path
import { GET as getAllUsers, POST as registerUser } from '../../app/api/users/route'; // Adjust the path as necessary
import { GET as getUserById, PATCH as updateUserPassword } from '../../app/api/users/user/route'; // Adjust the path as necessary
import { NextResponse } from 'next/server';

// Mock the UserRepository
vi.mock('@/lib/repository/UserRepo', () => ({
  getAllUsers: vi.fn(),
  getUserByEmail: vi.fn(),
  insertUser: vi.fn(),
  getUserById: vi.fn(),
  updateUserPassword: vi.fn(),
}));

// Mock environment variables
vi.stubEnv('JWT_SECRET', 'your_secret_key_here');

describe('API /users Tests', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('GET /api/users', () => {
    it('should return 200 and a list of users', async () => {
      const mockUsers = [
        {
          user_id: 4,
          name: "paras",
          email: "parascet2025@gmail.com",
          password: "$2a$10$urTyaD62WSpMRgRD5j28eeOtMQGFdWTIFpZOZv5uR6q3er656g/mi",
          phone: "7978271",
          address: "chkhole",
          profile_pic: null
        },
        {
          user_id: 5,
          name: "Paras Singh Bhatia",
          email: "ascet2025@gmail.com",
          password: "$2a$10$OX3PZPtr4wXt3Li/SYLom..igi0y2ifJNR3sx3Bsfdh1sUvzzneHG",
          phone: "07978018271",
          address: "RHR Hostel,Ghatikia, Kalinga Nagar",
          profile_pic: null
        }
      ];

      vi.spyOn(UserRepository, 'getAllUsers').mockResolvedValue([mockUsers,[]]);

      const req = new Request('http://localhost:3000/api/users', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const res = await getAllUsers();
      const responseJson = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson.user).toEqual(mockUsers);
    });
  });

  describe('POST /api/users', () => {
    it('should return 201 and register a new user', async () => {
      const newUser = {
        name: "sukhi",
        email: "parascet2089@gmail.com",
        password: "Paras@123",
        phone: "7978271",
        address: "chkhole"
      };

      vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[],[]]);
      vi.spyOn(UserRepository, 'insertUser').mockResolvedValue([[null],[]]);

      const req = new Request('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser)
      });

      const res = await registerUser(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(201);
      expect(responseJson).toEqual({ message: "User Registered Successfully" });
    });

    it('should return 400 if fields are missing', async () => {
      const req = new Request('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: "parascet2089@gmail.com" }) // missing other fields
      });

      const res = await registerUser(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ error: "Enter All The Fields" });
    });

    it('should return 409 if user already exists', async () => {
      vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[{ email: "parascet2089@gmail.com" }],[]]);

      const req = new Request('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: "sukhi",
          email: "parascet2089@gmail.com",
          password: "Paras@123",
          phone: "7978271",
          address: "chkhole"
        })
      });

      const res = await registerUser(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(409);
      expect(responseJson).toEqual({ error: "User with this email already exists" });
    });
  });

  describe('GET /api/users/user', () => {
    it('should return 200 and user details', async () => {
      const mockUser = {
        user_id: 8,
        name: "Paras Singh Bhatia",
        email: "2025@gmail.com",
        password: "$2a$10$99D94kp9p.Tq9YsSBnmyVufu9zqaZG9NmcxnNgA.mwDptLCtoExJO",
        phone: "07978018271",
        address: "RHR Hostel,Ghatikia, Kalinga Nagar",
        profile_pic: "1740387138955-Screenshot_2025-01-21-15-12-18-67_92460851df6f172a4592fca41cc2d2e6.jpg"
      };

      vi.spyOn(UserRepository, 'getUserById').mockResolvedValue([[mockUser],[]]);

      const req = new Request('http://localhost:3000/api/users/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', id: '8' },
      });

      const res = await getUserById(req as any);
      const [responseJson] = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson).toEqual(mockUser);
    });

    it('should return 404 if user not found', async () => {
      vi.spyOn(UserRepository, 'getUserById').mockResolvedValue([[],[]]);

      const req = new Request('http://localhost:3000/api/users/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', id: '999' },
      });

      const res = await getUserById(req as any);
      const responseJson = await res.json();

      expect(res.status).toBe(404);
      expect(responseJson).toEqual({ error: "User not found" });
    });
  });

  describe('PATCH /api/users/user', () => {
    it('should return 200 and update password', async () => {

      const mockUser = {
        user_id: 8,
        name: "Paras Singh Bhatia",
        email: "2025@gmail.com",
        password: "$2a$10$99D94kp9p.Tq9YsSBnmyVufu9zqaZG9NmcxnNgA.mwDptLCtoExJO",
        phone: "07978018271",
        address: "RHR Hostel,Ghatikia, Kalinga Nagar",
        profile_pic: "1740387138955-Screenshot_2025-01-21-15-12-18-67_92460851df6f172a4592fca41cc2d2e6.jpg"
      };

      vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[mockUser],[]]);
      vi.spyOn(UserRepository, 'updateUserPassword').mockResolvedValue([[null],[]]);

      const req = new Request('http://localhost:3000/api/users/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          email: "2025@gmail.com",
        },
        body: JSON.stringify({ newPassword: "Paras@1234" })
      });

      const res = await updateUserPassword(req as any, new NextResponse());
      const responseJson = await res.json();

      expect(res.status).toBe(200);
      expect(responseJson).toEqual({ message: "New Password updated successfully" });
    });

    it('should return 400 if newPassword is missing', async () => {
      const req = new Request('http://localhost:3000/api/users/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', email: "2025@gmail.com" },
        body: JSON.stringify({}) // missing newPassword
      });

      const res = await updateUserPassword(req as any, new NextResponse());
      const responseJson = await res.json();

      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ error: "New Password was not entered" });
    });

    it('should return 404 if user not found', async () => {
      vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[],[]]);

      const req = new Request('http://localhost:3000/api/users/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', email: "nonexistent@gmail.com" },
        body: JSON.stringify({ newPassword: "Paras@123" })
      });

      const res = await updateUserPassword(req as any, new NextResponse());
      const responseJson = await res.json();

      expect(res.status).toBe(404);
      expect(responseJson).toEqual({ error: "User not found" });
    });

    it('should return 400 if newPassword is the same as old password', async () => {
      const mockUser = {
        user_id: 8,
        name: "Paras Singh Bhatia",
        email: "2025@gmail.com",
        password: "$2a$10$99D94kp9p.Tq9YsSBnmyVufu9zqaZG9NmcxnNgA.mwDptLCtoExJO",
        phone: "07978018271",
        address: "RHR Hostel,Ghatikia, Kalinga Nagar",
        profile_pic: "1740387138955-Screenshot_2025-01-21-15-12-18-67_92460851df6f172a4592fca41cc2d2e6.jpg"
      };

      vi.spyOn(UserRepository, 'getUserByEmail').mockResolvedValue([[mockUser],[]]);

      const req = new Request('http://localhost:3000/api/users/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', email: "2025@gmail.com" },
        body: JSON.stringify({ newPassword: "Paras@123" })
      });

      const res = await updateUserPassword(req as any, new NextResponse());
      const responseJson = await res.json();

      expect(res.status).toBe(400);
      expect(responseJson).toEqual({ error: "Old Password and New Password cannot be the same" });
    });
  });
});
