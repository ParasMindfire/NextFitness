import React from "react";
import AnimatedQuotes from "@/components/AnimatedComponent";

const AnimatedQuotesComponent: React.FC = () => {
  return (
    <>
      {/* Container for the animated quotes with styling */}
      <div className="h-32 bg-gradient-to-r bg-primary flex items-center justify-center shadow-md">
        {/* Render the AnimatedQuotes component */}
        <AnimatedQuotes />
      </div>
    </>
  );
};

export default AnimatedQuotesComponent;
