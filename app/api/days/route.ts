import * as workoutRepo from "../../../lib/repository/WorkoutRepo";

export async function GET(req: Request) {
    try {
        // Get user ID from request headers
        const id = req.headers.get("id");
        if (!id) {
            return new Response(
                JSON.stringify({ error: "User ID is required" }), 
                { status: 400 }
            );
        }

        // Parse URL parameters for year and month
        const url = new URL(req.url);
        const year = url.searchParams.get("year") || new Date().getFullYear().toString();
        const month = url.searchParams.get("month") || (new Date().getMonth() + 1).toString();

        console.log("Year:", year, "Month:", month);

        // Define start and end dates for the selected month
        const startDate = new Date(`${year}-${month}-01`);
        const endDate = new Date(Number(year), Number(month), 0); // Last day of the month

        // Fetch workouts for the given user ID
        const workouts = await workoutRepo.getWorkoutsByUser(Number(id));

        // Filter workouts within the given month and format workout dates
        const monthlyWorkouts = workouts
            .filter((workout: { workout_date: string | number | Date }) => {
                const workoutDate = new Date(workout.workout_date);
                return workoutDate >= startDate && workoutDate <= endDate;
            })
            .map((workout: any) => ({
                ...workout,
                workout_date: new Date(workout.workout_date)
                    .toISOString()
                    .split("T")[0], // Format date to yyyy-mm-dd
            }));

        return new Response(JSON.stringify(monthlyWorkouts), { status: 200 });
    } catch (error) {
        console.error("Error fetching workouts:", error);

        // Return internal server error response
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }), 
            { status: 500 }
        );
    }
}
