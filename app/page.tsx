"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import React, { PropsWithChildren, useState, useEffect } from "react";
import SideBar from "@/app/SideBar/page";
import Main from "@/app/Main/page";

export default function Home(props: PropsWithChildren) {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMain, setShowMain] = useState(true);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed

      if (window.innerWidth < 768) {
        setShowSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    setShowMain(!showMain); // Set the opposite value to true
  };

  return (
    <div
      className={classNames({
        "grid  min-h-screen p-3": true,
        "grid-cols-sidebar": !collapsed && !isSmallScreen,
        "grid-cols-sidebar-collapsed": collapsed && !isSmallScreen,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      {isSmallScreen ? (
        <div>
          <Button onClick={toggleSidebar}>
            {showSidebar ? "Show Main" : "Show Sidebar"}
          </Button>
          {showSidebar && (
            <SideBar
              collapsed={collapsed}
              setCollapsed={setSidebarCollapsed}
              showSideBar={showSidebar}
              setShowSidebar={setShowSidebar}
              date={date}
              setDate={setDate}
            />
          )}
          {showMain && <Main />}
        </div>
      ) : (
        <>
          <SideBar
            collapsed={collapsed}
            setCollapsed={setSidebarCollapsed}
            showSideBar={showSidebar}
            setShowSidebar={setShowSidebar}
            date={date}
            setDate={setDate}
          />
          <Main />
        </>
      )}
    </div>
  );
}
