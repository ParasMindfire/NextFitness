import { NextRequest, NextResponse } from 'next/server';
import * as fitnessGoalsRepo from '../../../../lib/repository/FitnessRepo';
import * as Sentry from '@sentry/nextjs';

// Get single fitness goal
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    /*
      Extracting the 'id' parameter from the request.
      This ID is used to fetch a specific fitness goal.
    */
    console.log('Received ID:', params);

    const { id } = params;
    if (!id) {
      /*
        If no ID is provided, return a 400 Bad Request error.
        The ID is required to fetch a specific fitness goal.
      */
      return NextResponse.json(
        { error: 'Goal ID is required' },
        { status: 400 }
      );
    }

    /*
      Fetching the fitness goal from the repository based on the given ID.
    */
    const goal = await fitnessGoalsRepo.getSingleFitnessGoal(id);

    if (!goal) {
      /*
        If the goal is not found in the database, return a 404 Not Found error.
      */
      return NextResponse.json(
        { error: `Goal with ID=${id} not found` },
        { status: 404 }
      );
    }

    /*
      Returning the found fitness goal as a JSON response with a 200 status.
    */
    return NextResponse.json(goal, { status: 200 });
  } catch (error: any) {
    /*
      Handling any unexpected errors that occur during execution.
      Returning a 500 Internal Server Error response.
    */
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Update fitness goal
export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    /*
      Extracting the 'id' parameter from the request.
      This ID is used to identify the fitness goal to be updated.
    */
    const { id } = params;

    /*
      Extracting JSON body from the request which contains the fields to be updated.
    */
    const { target_value, current_progress, status } = await req.json();

    if (!id || !target_value || !current_progress || !status) {
      /*
        If any of the required fields are missing, return a 400 Bad Request error.
      */
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    /*
      Calling repository function to update the fitness goal in the database.
    */
    await fitnessGoalsRepo.updateFitnessGoal(
      id,
      target_value,
      current_progress,
      status
    );

    /*
      Returning a success message after successful update.
    */
    return NextResponse.json(
      { message: 'Fitness goal updated successfully' },
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

// Delete fitness goal
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    /*
      Extracting the 'id' parameter from the request.
      This ID is used to identify the fitness goal that needs to be deleted.
    */
    const { id } = params;
    if (!id) {
      /*
        If no ID is provided, return a 400 Bad Request error.
      */
      return NextResponse.json(
        { error: 'Goal ID is required' },
        { status: 400 }
      );
    }

    /*
      Calling repository function to delete the fitness goal from the database.
    */
    await fitnessGoalsRepo.deleteFitnessGoal(id);

    /*
      Returning a success message after successful deletion.
    */
    return NextResponse.json(
      { message: 'Fitness goal deleted successfully' },
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
