import React from "react";
import AnimatedQuotesComponent from "@/components/AnimatedQuotesComponent";
import UserSection from "@/components/UserSection";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-tertiary text-gray-800">
      <AnimatedQuotesComponent />
      <UserSection />
    </div>
  );
};

export default Landing;
