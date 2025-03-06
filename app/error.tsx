'use client';

export default function ErrorPage() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-4xl font-bold text-red-600'>Something went wrong!</h1>
      <p className='text-lg text-gray-700 mt-2'>
        An unexpected error occurred. Please try again later.
      </p>
    </div>
  );
}
