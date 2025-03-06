'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

const Breadcrumbs: React.FC = () => {
  const pathname = usePathname();

  // Splitting pathname into an array and filtering out empty values
  const pathnames = pathname.split('/').filter((x) => x);

  // Mapping specific paths to display names
  const breadcrumbNameMap: Record<string, string> = {
    '': 'Dashboard',
    signup: 'Signup',
    login: 'Login',
    workoutFormPage: 'Workout Form',
    workoutViews: 'Workout Views',
    fitnessFormPage: 'Fitness Form',
    fitnessViews: 'Fitness Views',
    calories: 'Workout Calories',
    durations: 'Workout Durations',
    profile: 'Profile',
  };

  return (
    <>
      {/* Breadcrumb navigation */}
      <nav className='flex items-center space-x-1 text-sm text-secondary mb-2 ml-5'>
        {/* Home link */}
        <Link href='/' className='hover:text-primary font-medium'>
          Home
        </Link>

        {/* Generating breadcrumb links dynamically */}
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          return (
            <span key={routeTo} className='flex items-center'>
              {/* Chevron icon between breadcrumb items */}
              <ChevronRight className='w-3 h-3 mx-1 text-tertiary' />
              {isLast ? (
                // Last breadcrumb item (non-clickable)
                <span className='text-primary font-semibold'>
                  {breadcrumbNameMap[value] || value}
                </span>
              ) : (
                // Clickable breadcrumb link
                <Link href={routeTo} className='hover:text-hover'>
                  {breadcrumbNameMap[value] || value}
                </Link>
              )}
            </span>
          );
        })}
      </nav>
    </>
  );
};

export default Breadcrumbs;
