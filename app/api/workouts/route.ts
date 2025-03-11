import { NextResponse } from 'next/server';
import * as workoutRepo from '../../../lib/repository/WorkoutRepo';
import * as Sentry from '@sentry/nextjs';
import connectDB from '@/lib/db';

// Fetch all workouts from the database.
export async function GET() {
  try {
    // connectDB();
    /* 
      Retrieve all workouts from the repository.
      If no workouts are found, return a 404 response.
    */
   
    const workouts = await workoutRepo.getAllWorkouts();

    // console.log("workouts all ",workouts);

    if (workouts.length==0) {
      return NextResponse.json(
        { error: 'No Data To Show in Workouts' },
        { status: 404 }
      );
    }

    /* 
      Return the retrieved workouts in a successful response.
    */
    return NextResponse.json(workouts, { status: 200 });
  } catch (error) {
    /* 
      Handle any unexpected errors and return a generic server error response.
    */
    Sentry.captureException(error);
    console.error('Error fetching workouts:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
