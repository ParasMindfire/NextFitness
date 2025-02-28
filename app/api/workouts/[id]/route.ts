import { NextRequest, NextResponse } from "next/server";
import * as workoutRepo from "@/lib/repository/WorkoutRepo";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Workout ID is required" }, { status: 400 });
        }

        const workout = await workoutRepo.getWorkoutById(parseInt(id));
        if (!workout.length) {
            return NextResponse.json({ error: `Workout with ID=${id} not found` }, { status: 404 });
        }

        return NextResponse.json(workout[0], { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
