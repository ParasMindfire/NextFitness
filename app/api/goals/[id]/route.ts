import { NextRequest, NextResponse } from "next/server";
import * as fitnessGoalsRepo from "../../../../lib/repository/FitnessRepo";

// Get single fitness goal
export async function GET(req: NextRequest, { params }: { params: {id: string } }) {
    try {
        // const userId:any = req.headers.get("id");
        // if (!userId) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        console.log("id ",params);

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Goal ID is required" }, { status: 400 });
        }

        const goal = await fitnessGoalsRepo.getSingleFitnessGoal(parseInt(id));

        if (!goal.length) {
            return NextResponse.json({ error: `Goal with ID=${id} not found` }, { status: 404 });
        }

        return NextResponse.json(goal[0], { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Update fitness goal
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // const userId:any = req.headers.get("id");
        // if (!userId) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const { id } = params;
        const { target_value, current_progress, status } = await req.json();

        if (!id || !target_value || !current_progress || !status) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await fitnessGoalsRepo.updateFitnessGoal(parseInt(id), target_value, current_progress, status);

        return NextResponse.json({ message: "Fitness goal updated successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Delete fitness goal
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    try {
        // const userId:any = req.headers.get("id");
        // if (!userId) {
        //     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        // }

        const { id } = params;
        if (!id) {
            return NextResponse.json({ error: "Goal ID is required" }, { status: 400 });
        }

        await fitnessGoalsRepo.deleteFitnessGoal(parseInt(id));

        return NextResponse.json({ message: "Fitness goal deleted successfully" }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
