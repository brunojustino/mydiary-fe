"use client";

import React, { createContext, useContext, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";

interface AppContextType {
  collapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  showMain: boolean;
  setShowMain: React.Dispatch<React.SetStateAction<boolean>>;
  date: Date | undefined;
  setDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isSmallScreen: boolean;
  setIsSmallScreen: React.Dispatch<React.SetStateAction<boolean>>;
  initialSmallScreen: boolean;
  setInitialSmallScreen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMain, setShowMain] = useState(true);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [initialSmallScreen, setInitialSmallScreen] = useState(false);

  return (
    <SessionProvider>
      <AppContext.Provider
        value={{
          collapsed,
          setSidebarCollapsed,
          showSidebar,
          setShowSidebar,
          showMain,
          setShowMain,
          date,
          setDate,
          isSmallScreen,
          setIsSmallScreen,
          initialSmallScreen,
          setInitialSmallScreen,
        }}
      >
        {children}
      </AppContext.Provider>
    </SessionProvider>
  );
};
