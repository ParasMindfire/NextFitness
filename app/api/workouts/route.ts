import { NextResponse } from "next/server";
import * as workoutRepo from "../../../lib/repository/WorkoutRepo";

// Fetch all workouts from the database.
export async function GET() {
    try {
        const workouts = await workoutRepo.getAllWorkouts();
        if (!workouts.length) {
            return NextResponse.json({ error: "No Data To Show in Workouts" }, { status: 404 });
        }
        return NextResponse.json(workouts, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
