import { NextResponse } from 'next/server';
import * as workoutRepo from '../../../../lib/repository/WorkoutRepo';
import { format } from 'date-fns';

// Fetch all workouts for a specific user.
export async function GET(req: Request) {
  try {
    const id: any = req.headers.get('id');
    console.log('get workout by single user id', id);
    const workouts = await workoutRepo.getWorkoutsByUser(id);
    if (!workouts.length) {
      return NextResponse.json(
        { error: 'No Data To Show in Workouts By User' },
        { status: 404 }
      );
    }
    return NextResponse.json(workouts, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Create a new workout entry for a user.
export async function POST(req: Request) {
  try {
    const id: any = req.headers.get('id');
    const { exercise_type, duration, calories_burned, workout_date } =
      await req.json();

    if (!exercise_type || !duration || !calories_burned || !workout_date) {
      return NextResponse.json(
        { error: 'Enter All The Fields' },
        { status: 400 }
      );
    }

    const existingExercise = await workoutRepo.findWorkout(
      id,
      workout_date,
      exercise_type
    );
    if (existingExercise.length > 0) {
      return NextResponse.json(
        { error: 'You have already added this exercise today' },
        { status: 409 }
      );
    }

    await workoutRepo.createWorkout(
      id,
      exercise_type,
      duration,
      calories_burned,
      workout_date
    );
    return NextResponse.json(
      { message: 'Workout Added Successfully' },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Update an existing workout entry.
export async function PATCH(req: Request) {
  try {
    const id: any = req.headers.get('id');
    const {
      workout_id,
      exercise_type,
      duration,
      calories_burned,
      workout_date,
    } = await req.json();

    if (
      !workout_id ||
      !exercise_type ||
      !duration ||
      !calories_burned ||
      !workout_date
    ) {
      return NextResponse.json(
        { error: 'Enter All The Fields' },
        { status: 400 }
      );
    }

    const formattedDate = format(new Date(workout_date), 'yyyy-MM-dd');
    await workoutRepo.updateWorkout(
      id,
      workout_id,
      exercise_type,
      duration,
      calories_burned,
      formattedDate
    );
    return NextResponse.json(
      { message: 'Workout Updated Successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

// Delete a workout entry.
export async function DELETE(req: Request) {
  try {
    const id: any = req.headers.get('id');
    const { workout_id } = await req.json();

    if (!workout_id) {
      return NextResponse.json(
        { error: 'Workout ID is required' },
        { status: 400 }
      );
    }

    await workoutRepo.deleteWorkout(id, workout_id);
    return NextResponse.json(
      { message: 'Workout Deleted Successfully' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
