import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as Sentry from '@sentry/nextjs';
import connectDB from '@/lib/mongodb/db';
import { userRepo } from '../RepoInitializer';

// GET - Fetch All Users
export async function GET() {
  try {
    if(process.env.DB=="mongodb")connectDB();
    const users = await userRepo.getAllUsers();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error: any) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST - Register a New User
export async function POST(req: NextRequest) {
  try {
    if(process.env.DB=="mongodb")connectDB();
    const body = await req.json();
    const { name, email, password, phone, address } = body;

    if (!name || !email || !password || !phone || !address) {
      return NextResponse.json({ error: "Enter All The Fields" }, { status: 400 });
    }

    const existingUser:any = await userRepo.getUserByEmail(email);

    console.log("kya ara user ",existingUser);

    if (existingUser && (Array.isArray(existingUser) ? existingUser.length > 0 : true)) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
    }


    console.log("ayahan a rha ?? ");

    const hashed_password = bcrypt.hashSync(password, 10);
    await userRepo.insertUser(name, email, hashed_password, phone, address);

    return NextResponse.json({ message: "User Registered Successfully" }, { status: 201 });
  } catch (error: any) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
