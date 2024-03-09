"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import React, { PropsWithChildren, useState, useEffect } from "react";
import SideBar from "@/components/ui/Sidebar/page";
import Main from "@/components/ui/Main/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home(props: PropsWithChildren) {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [showMain, setShowMain] = useState(true);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [initialSmallScreen, setInitialSmallScreen] = useState(false);

  // TODO fix the screen resize when it's small
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Adjust the breakpoint as needed

      if (window.innerWidth < 768 && !initialSmallScreen) {
        setShowSidebar(false);
        setInitialSmallScreen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialSmallScreen]);

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
        <div className="justify-self-center w-full">
          <div className="flex justify-center p-2 items-center">
            <Avatar
              className={classNames({
                "ml-5 ": !collapsed,
                "ml-0": collapsed,
                "h-12 w-12": true,
              })}
            >
              <AvatarImage
                src="https://github.com/shadcn.png"
                className="h-12 w-12"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              onClick={toggleSidebar}
              className="mb-1 ml-5 border-black"
            >
              {showSidebar ? "Diary" : "SidePanel"}
            </Button>
          </div>
          {showSidebar && (
            <SideBar
              collapsed={collapsed}
              setCollapsed={setSidebarCollapsed}
              showSideBar={showSidebar}
              setShowSidebar={setShowSidebar}
              date={date}
              setDate={setDate}
              isSmallScreen={isSmallScreen}
            />
          )}
          {showMain && (
            <Main isSmallScreen={isSmallScreen} date={date} setDate={setDate} />
          )}
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
            isSmallScreen={isSmallScreen}
          />
          <Main isSmallScreen={isSmallScreen} date={date} setDate={setDate} />
        </>
      )}
    </div>
  );
}
