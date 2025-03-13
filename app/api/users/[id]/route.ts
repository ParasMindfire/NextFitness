import { NextRequest, NextResponse } from 'next/server';
import { userRepo } from '../../RepoInitializer';// Ensure correct import path
import * as Sentry from '@sentry/nextjs';

// DELETE User by ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await userRepo.deleteUserById(id);
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error: any) {
    Sentry.captureException(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
