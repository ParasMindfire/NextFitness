'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useUserStore } from '../app/store/useUserStore';
import UserGoalsComponent from '@/components/UserGoalsComponent';
import ChatComponent from '@/components/ChatComponent';
import AuthComponent from '@/components/AuthComponent';

const UserSection: React.FC = () => {
  const { data: session, status } = useSession();
  const { user, setUser } = useUserStore();

  useEffect(() => {
    if (session && session.user) {
      setUser(session.user);
    }
  }, [session, setUser]);

  if (status === 'loading') {
    return <div>Loading...</div>; // Optional: Show a loading state
  }

  return (
    <div className='flex-1 p-4 md:p-8 space-y-6'>
      {/* Conditional rendering based on user authentication */}
      {user ? (
        <div className='flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6'>
          {/* Display user goals and chat components if user is authenticated */}
          <UserGoalsComponent />
          <ChatComponent />
        </div>
      ) : (
        /* Display authentication component if user is not authenticated */
        <AuthComponent />
      )}
    </div>
  );
};

export default UserSection;
