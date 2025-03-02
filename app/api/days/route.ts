import * as workoutRepo from "../../../lib/repository/WorkoutRepo";
export async function GET(req: Request) {
    try {
        const id = req.headers.get("id");
        if (!id) {
            return new Response(JSON.stringify({ error: "User ID is required" }), { status: 400 });
        }

        // Parse URL parameters
        const url = new URL(req.url);
        const year = url.searchParams.get("year") || new Date().getFullYear().toString();
        const month = url.searchParams.get("month") || (new Date().getMonth() + 1).toString();

        console.log("Year:", year, "Month:", month);

        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(Number(year), Number(month), 0); // Last day of the month

        const workouts = await workoutRepo.getWorkoutsByUser(Number(id));

        const monthlyWorkouts = workouts
            .filter((workout: { workout_date: string | number | Date }) => {
                const workoutDate = new Date(workout.workout_date);
                return workoutDate >= startDate && workoutDate <= endDate;
            })
            .map((workout: any) => ({
                ...workout,
                workout_date: new Date(workout.workout_date).toISOString().split("T")[0], // Format to yyyy-mm-dd
            }));

        return new Response(JSON.stringify(monthlyWorkouts), { status: 200 });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}
