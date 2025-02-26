import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import * as UserRepository from "@/lib/repository/UserRepo"; // Use @ for absolute imports if configured

export async function GET() {
    console.log("middleware hii getalluser")
    const [users] = await UserRepository.getAllUsers();
    return NextResponse.json({user:users},{status:200});
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, password, phone, address } = body;

        if (!name || !email || !password || !phone || !address) {
            return NextResponse.json({ error: "Enter All The Fields" }, { status: 400 });
        }

        const [existingUser] = await UserRepository.getUserByEmail(email);

        console.log("existing ",existingUser);
        if (existingUser.length > 0) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
        }

        const hashed_password = bcrypt.hashSync(password, 10);
        await UserRepository.insertUser(name, email, hashed_password, phone, address);

        return NextResponse.json({ message: "User Registered Successfully" }, { status: 201 });
    } catch (error: any) {
        console.log("kya error hai ",error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
