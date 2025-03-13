import { NextRequest, NextResponse } from 'next/server';
import { workoutRepo } from '../../RepoInitializer';
import * as Sentry from '@sentry/nextjs';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    /* 
      Extract the workout ID from the request parameters.
      Ensure that the ID exists before proceeding.
    */
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Workout ID is required' },
        { status: 400 }
      );
    }
    
    const workoutId = id;

    /* 
      Fetch the workout details from the repository using the given ID.
      If no workout is found, return a 404 response.
    */
    const workout = await workoutRepo.getWorkoutById(workoutId);

    if (!workout.length) {
      return NextResponse.json(
        { error: `Workout with ID=${workoutId} not found` },
        { status: 404 }
      );
    }

    /* 
      Return the found workout details in a successful response.
    */
    return NextResponse.json(workout[0], { status: 200 });
  } catch (error: any) {
    /* 
      Handle any unexpected errors and return a generic server error response.
    */
    Sentry.captureException(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
