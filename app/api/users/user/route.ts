import { NextRequest, NextResponse } from "next/server";
import * as UserRepository from "@/lib/repository/UserRepo"; // Ensure correct import path

// ✅ GET User by ID
export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        // const id = req.nextUrl.pathname.split("/").pop();
        console.log("hiiii");
        const id:any = req.headers.get("id");

        console.log("id ",id);

        // const {id}=params;

        if (!id) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const [user]: any = await UserRepository.getUserById(Number(id));

        if (!user || user.length === 0) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}