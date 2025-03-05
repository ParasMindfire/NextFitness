"use client";

import React from "react";
import { useUserStore } from "../app/store/useUserStore";
import UserGoalsComponent from "@/components/UserGoalsComponent";
import ChatComponent from "@/components/ChatComponent";
import AuthComponent from "@/components/AuthComponent";

const UserSection: React.FC = () => {
  const { user } = useUserStore();

  return (
    <div className="flex-1 p-4 md:p-8 space-y-6">
      {user ? (
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          <UserGoalsComponent />
          <ChatComponent />
        </div>
      ) : (
        <AuthComponent />
      )}
    </div>
  );
};

export default UserSection;
