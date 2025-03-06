import { NextRequest, NextResponse } from "next/server";
import * as UserRepository from "@/lib/repository/UserRepo"; // Ensure correct import path

// DELETE User by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    /*
      Extracting the user ID from the request parameters.
      This ID represents the user who needs to be deleted.
    */
    const { id } = params;

    if (!id) {
      /*
        If no user ID is provided in the request,
        return a 400 Bad Request response.
      */
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 },
      );
    }

    /*
      Calling the repository function to delete the user by their email.
    */
    await UserRepository.deleteUserByEmail(id);

    /*
      Returning a success message with a 200 OK response
      to indicate successful deletion.
    */
    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    /*
      Handling unexpected errors and returning a 500 Internal Server Error response.
    */
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
