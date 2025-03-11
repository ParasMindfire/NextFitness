import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import * as UserRepository from '@/lib/repository/UserRepo'; // Use @ for absolute imports if configured
import * as Sentry from '@sentry/nextjs';
import connectDB from '@/lib/db';

// GET - Fetch All Users
export async function GET() {
  try {
    connectDB();
    console.log('middleware hii getalluser');

    /*
      Fetching all users from the UserRepository.
      The result is expected to be an array of users.
    */
    const users = await UserRepository.getAllUsers();

    /*
      Returning the list of users with a 200 OK response.
    */
    return NextResponse.json({ user: users }, { status: 200 });
  } catch (error: any) {
    /*
      Handling any unexpected errors and returning a 500 Internal Server Error response.
    */
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}





// POST - Register a New User
export async function POST(req: Request) {
  try {
    connectDB();
    /*
      Parsing the request body to extract user details.
    */
    const body = await req.json();
    const { name, email, password, phone, address } = body;

    /*
      Validating if all required fields are provided.
      If any field is missing, return a 400 Bad Request response.
    */
    if (!name || !email || !password || !phone || !address) {
      return NextResponse.json(
        { error: 'Enter All The Fields' },
        { status: 400 }
      );
    }

    /*
      Checking if a user with the given email already exists.
    */
    const existingUser:any = await UserRepository.getUserByEmail(email);

    console.log('existing ', existingUser);
    if (existingUser) {
      /*
        If a user already exists with the same email, return a 409 Conflict response.
      */
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    /*
      Hashing the user's password before storing it in the database.
    */
    const hashed_password = bcrypt.hashSync(password, 10);

    /*
      Inserting the new user into the UserRepository.
    */
    const user=await UserRepository.insertUser(
      name,
      email,
      hashed_password,
      phone,
      address
    );

    console.log("user kya ha ",user);

    /*
      Returning a success message with a 201 Created response.
    */
    return NextResponse.json(
      { message: 'User Registered Successfully' },
      { status: 201 }
    );
  } catch (error: any) {
    console.log('kya error hai ', error);
    Sentry.captureException(error);
    /*
      Handling unexpected errors and returning a 500 Internal Server Error response.
    */
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
