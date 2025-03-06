import React from 'react';
import Link from 'next/link';

const AuthComponent: React.FC = () => {
  return (
    <>
      {/* Main container with minimum height and center alignment */}
      <div className='min-h-[500px] flex items-center justify-center bg-tertiary'>
        {/* Card container with padding, rounded corners, and shadow */}
        <div className='bg-white p-8 rounded-xl shadow-lg text-center'>
          {/* Navbar title */}
          <h2 className='text-3xl font-bold text-secondary'>NAVBAR TITLE</h2>
          <p className='text-secondary mt-2'>PERSONAL TRACKER</p>

          {/* Authentication buttons */}
          <div className='mt-6 space-y-4'>
            {/* Signup button */}
            <Link href='/signup'>
              <button className='bg-primary cursor-pointer hover:bg-hover text-white px-6 py-3 rounded-lg transition-colors'>
                SIGNUP
              </button>
            </Link>

            <p className='text-secondary'>ALREADY A USER ?</p>

            {/* Login button */}
            <Link href='/login'>
              <button className='bg-primary cursor-pointer hover:bg-hover text-white px-6 py-3 rounded-lg transition-colors'>
                LOGIN
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthComponent;
