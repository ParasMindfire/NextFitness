import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as UserRepository from '@/lib/repository/UserRepo'; // Ensure correct import path
import * as Sentry from '@sentry/nextjs';

export async function POST(req: NextRequest) {
  try {
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
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare provided password with stored hash
    if (!bcrypt.compareSync(password, user[0].password)) {
      return NextResponse.json(
        { error: 'Invalid Credentials' },
        { status: 401 }
      );
    }

    // Generate JWT access token
    const accessToken = jwt.sign(
      { id: user[0].user_id, email: user[0].email },
      process.env.JWT_SECRET as string,
      { expiresIn: '15m' }
    );

    return NextResponse.json(
      { message: 'Login successful', accessToken, user: user[0] },
      { status: 200 }
    );
  } catch (error: any) {
    Sentry.captureException(error);
    console.error('Login error:', error);

    // Return server error response
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
