import * as Sentry from '@sentry/nextjs';
import connectDB from './lib/mongodb/db';

export async function register() {
  // await connectDB()
}

export const onRequestError = Sentry.captureRequestError;




