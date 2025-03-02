import { NextResponse } from "next/server";
import * as workoutRepo from "../../../lib/repository/WorkoutRepo";

export async function GET(req:Request){ 
    try {
        const id: any = req.headers.get("id");
        console.log("id ", id);

        const workouts = await workoutRepo.getWorkoutsByUser(id);

        if (!workouts.length) return NextResponse.json({ streak: 0 },{status:200});

        // Sort workouts by date (ascending)
        const sortedWorkouts = workouts.sort((a: any, b: any) => 
            new Date(a.workout_date).getTime() - new Date(b.workout_date).getTime()
        );

        let streak = 0;

        // Set today's date to midnight for accurate day difference
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Start from the latest workout
        for (let i = sortedWorkouts.length - 1; i >= 0; i--) {
            const workoutDate = new Date(sortedWorkouts[i].workout_date);
            workoutDate.setHours(0, 0, 0, 0); // Normalize workout date

            const diffDays = Math.floor((today.getTime() - workoutDate.getTime()) / (1000 * 3600 * 24));

            if (diffDays === 0 || diffDays === streak) {
                streak++;
            } else if (diffDays > streak) {
                break;
            }
        }

        return NextResponse.json({ streak },{status:200});
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 },
          );
    }
};