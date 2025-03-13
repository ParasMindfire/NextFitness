import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as UserRepository from '@/lib/repository/UserRepo'; // Ensure correct import path
import * as Sentry from '@sentry/nextjs';
import connectDB from '@/lib/mongodb/db';

export async function POST(req: NextRequest) {
  try {
    // Connect to database
    connectDB();

    // Parse the request body
    const body = await req.json();
    const { email, password } = body;

    // Validate input fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Enter All The Fields' },
        { status: 400 }
      );
    }

    // Fetch user by email
    const user: any = await UserRepository.getUserByEmail(email);
    console.log("User from mongoose:", user);

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare provided password with stored hash
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { error: 'Invalid Credentials' },
        { status: 401 }
      );
    }

    // Define the JWT payload
    const payload = {
      id: user.user_id,   // Assigning the user ID as payload
      email: user.email,
      role: user.role || 'user', // Optional role if you have roles in the schema
    };

    // Generate JWT access token
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: '15m',
    });

    return NextResponse.json(
      {
        message: 'Login successful',
        accessToken,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    Sentry.captureException(error);
    console.error('Login error:', error);

    // Return server error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
