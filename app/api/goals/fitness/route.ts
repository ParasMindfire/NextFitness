import { NextRequest, NextResponse } from "next/server";
import * as fitnessGoalsRepo from "../../../../lib/repository/FitnessRepo";
import * as Sentry from "@sentry/nextjs";

// Get all fitness goals for authenticated user
export async function GET(req: NextRequest) {
  try {
    /*
      Extracting the 'id' from request headers.
      This ID represents the authenticated user.
    */
    const userId: any = req.headers.get("id");

    if (!userId) {
      /*
        If no user ID is found in the request headers,
        return a 401 Unauthorized response.
      */
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /*
      Fetching all fitness goals associated with the authenticated user.
    */
    const fitnessGoals = await fitnessGoalsRepo.getAllFitnessGoals(userId);

    if (!fitnessGoals.length) {
      /*
        If no fitness goals are found, return a 404 Not Found response.
      */
      return NextResponse.json(
        { error: "No fitness goals found" },
        { status: 404 }
      );
    }

    /*
      Returning the list of fitness goals with a 200 OK response.
    */
    return NextResponse.json(fitnessGoals, { status: 200 });
  } catch (error: any) {
    /*
      Handling unexpected errors and returning a 500 Internal Server Error response.
    */
    Sentry.captureException(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new fitness goal
export async function POST(req: NextRequest) {
  try {
    /*
      Extracting the 'id' from request headers.
      This ID represents the authenticated user.
    */
    const userId: any = req.headers.get("id");

    if (!userId) {
      /*
        If no user ID is found in the request headers,
        return a 401 Unauthorized response.
      */
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    /*
      Extracting the goal details from the request body.
    */
    const { goal_type, target_value, current_progress, start_date, end_date } =
      await req.json();

    if (
      !goal_type ||
      !target_value ||
      !current_progress ||
      !start_date ||
      !end_date
    ) {
      /*
        If any required fields are missing, return a 400 Bad Request response.
      */
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    /*
      Calling repository function to create a new fitness goal for the user.
    */
    await fitnessGoalsRepo.createFitnessGoal(
      userId,
      goal_type,
      target_value,
      current_progress,
      start_date,
      end_date
    );

    /*
      Returning a success message with a 201 Created response.
    */
    return NextResponse.json(
      { message: "Fitness goal created successfully" },
      { status: 201 }
    );
  } catch (error: any) {
    /*
      Handling unexpected errors and returning a 500 Internal Server Error response.
    */
    Sentry.captureException(error);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
