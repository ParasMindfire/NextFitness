import { NextRequest, NextResponse } from "next/server";
import * as UserRepository from "@/lib/repository/UserRepo"; // Ensure correct import path
import bcrypt from "bcryptjs";

// ✅ GET User by ID
export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
    try {
        // const id = req.nextUrl.pathname.split("/").pop();
        // console.log("hiiii");
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


export async function PATCH(req:NextRequest,res:NextResponse){
    try {
        const body=await req.json();
        const email:any = req.headers.get("email");

        const { newPassword } = body;

        if (!newPassword) {
            return NextResponse.json({error:"New Password was not entered"},{status:400})
        }

        const [user]: any = await UserRepository.getUserByEmail(email);

        if (!user.length) {
            return NextResponse.json({error:"User not found"},{status:404});
        }

        console.log("user ",user);

        const oldPassword: any = user[0].password;
        if (bcrypt.compareSync(newPassword, oldPassword)) {
            return NextResponse.json({error:"Old Password and New Password cannot be the same"},{status:400})
        }

        const salt = bcrypt.genSaltSync(10);
        const hashed_newPassword = bcrypt.hashSync(newPassword, salt);
        await UserRepository.updateUserPassword(email, hashed_newPassword);

        return NextResponse.json({message:"New Password updated successfully"},{status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500});
    }
}