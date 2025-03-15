import { NextRequest, NextResponse } from 'next/server';
import { userRepo } from '../../RepoInitializer'; // Ensure correct import path
import bcrypt from 'bcryptjs';
import * as Sentry from '@sentry/nextjs';

// GET User by ID
export async function GET(req: NextRequest) {
  try {
    /*
      Extracting the user ID from the request headers.
      This ID is required to fetch the user details.
    */
    const id: any = req.headers.get('id');
    // const userId=await UserRepository.getIDByUserId(id);

    console.log('id ', id);

    if (!id) {
      /*
        If the user ID is missing, return a 400 Bad Request response.
      */
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    /*
      Fetching the user details from the repository using the provided ID.
    */
    const user: any = await userRepo.getUserById(id);

    console.log("sigle user ",user);

    if (!user || user.length === 0) {
      /*
        If no user is found, return a 404 Not Found response.
      */
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    /*
      Returning the user details with a 200 OK response.
    */
    return NextResponse.json(user, { status: 200 });
  } catch (error: any) {
    /*
      Handling unexpected errors and returning a 500 Internal Server Error response.
    */
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH - Update User Password
export async function PATCH(req: NextRequest) {
  try {
    /*
      Parsing the request body to extract the new password.
    */
    const body = await req.json();
    const email: any = req.headers.get('email');

    const { newPassword } = body;

    if (!newPassword) {
      /*
        If the new password is not provided, return a 400 Bad Request response.
      */
      return NextResponse.json(
        { error: 'New Password was not entered' },
        { status: 400 }
      );
    }

    /*
      Fetching the user details by email from the repository.
    */
    const [user]: any = await userRepo.getUserByEmail(email);

    if (!user.length) {
      /*
        If no user is found, return a 404 Not Found response.
      */
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    console.log('user ', user);

    /*
      Checking if the new password is the same as the old password.
      If they match, return a 400 Bad Request response.
    */
    const oldPassword: any = user[0].password;
    if (bcrypt.compareSync(newPassword, oldPassword)) {
      return NextResponse.json(
        { error: 'Old Password and New Password cannot be the same' },
        { status: 400 }
      );
    }

    /*
      Hashing the new password before updating it in the database.
    */
    const salt = bcrypt.genSaltSync(10);
    const hashed_newPassword = bcrypt.hashSync(newPassword, salt);

    /*
      Updating the user's password in the repository.
    */
    await userRepo.updateUserPassword(email, hashed_newPassword);

    /*
      Returning a success message with a 200 OK response.
    */
    return NextResponse.json(
      { message: 'New Password updated successfully' },
      { status: 200 }
    );
  } catch (error: any) {
    /*
      Handling unexpected errors and returning a 500 Internal Server Error response.
    */
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
