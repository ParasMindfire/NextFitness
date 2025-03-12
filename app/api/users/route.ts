import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as UserRepository from '@/lib/repository/UserRepo'; // Use @ for absolute imports if configured
import * as Sentry from '@sentry/nextjs';
import connectDB from '@/lib/db';

// GET - Fetch All Users
export async function GET() {
  try {
    connectDB();
    const users = await UserRepository.getAllUsers();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Register a New User
export async function POST(req: NextRequest) {
  try {
    connectDB();
    const body = await req.json();
    const { name, email, password, phone, address } = body;

    if (!name || !email || !password || !phone || !address) {
      return NextResponse.json({ error: "Enter All The Fields" }, { status: 400 });
    }

    const existingUser = await UserRepository.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }

    const hashed_password = bcrypt.hashSync(password, 10);
    await UserRepository.insertUser(name, email, hashed_password, phone, address);

    return NextResponse.json({ message: "User Registered Successfully" }, { status: 201 });
  } catch (error: any) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
