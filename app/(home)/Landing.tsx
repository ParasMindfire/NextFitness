import React from "react";
import AnimatedQuotesComponent from "@/components/AnimatedQuotesComponent";
import UserSection from "@/components/UserSection";

{/* Main container for the landing page */}
const Landing: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col bg-tertiary text-gray-800">
        {/* Animated quotes section */}
        <AnimatedQuotesComponent />
        {/* User-related section */}
        <UserSection />
      </div>
    </>
  );
};

export default Landing;
