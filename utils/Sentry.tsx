import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN, // Use environment variable
  tracesSampleRate: 1.0,
  debug: process.env.NODE_ENV === 'development', // Show logs in development
});
