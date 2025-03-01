import { NextRequest, NextResponse } from "next/server";
import * as fitnessGoalsRepo from "../../../../lib/repository/FitnessRepo";

// Get all fitness goals for authenticated user
export async function GET(req: NextRequest) {
  try {
    const userId: any = req.headers.get("id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const fitnessGoals = await fitnessGoalsRepo.getAllFitnessGoals(userId);

    if (!fitnessGoals.length) {
      return NextResponse.json(
        { error: "No fitness goals found" },
        { status: 404 },
      );
    }

    return NextResponse.json(fitnessGoals, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Create a new fitness goal
export async function POST(req: NextRequest) {
  try {
    const userId: any = req.headers.get("id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { goal_type, target_value, current_progress, start_date, end_date } =
      await req.json();

    if (
      !goal_type ||
      !target_value ||
      !current_progress ||
      !start_date ||
      !end_date
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    await fitnessGoalsRepo.createFitnessGoal(
      userId,
      goal_type,
      target_value,
      current_progress,
      start_date,
      end_date,
    );

    return NextResponse.json(
      { message: "Fitness goal created successfully" },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
