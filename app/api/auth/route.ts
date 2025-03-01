import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as UserRepository from "@/lib/repository/UserRepo"; // Ensure correct import path

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Parse JSON body
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Enter All The Fields" },
        { status: 400 },
      );
    }

    const [user]: any = await UserRepository.getUserByEmail(email);
    if (!user || user.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!bcrypt.compareSync(password, user[0].password)) {
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 },
      );
    }

    const accessToken = jwt.sign(
      { id: user[0].user_id, email: user[0].email },
      process.env.JWT_SECRET as string,
      { expiresIn: "15m" },
    );

    return NextResponse.json(
      { message: "Login successful", accessToken, user: user[0] },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
