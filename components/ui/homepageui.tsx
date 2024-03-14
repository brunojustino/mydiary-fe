"use client";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import React, { PropsWithChildren, useState, useEffect } from "react";
import SideBar from "@/components/ui/Sidebar/page";
import Main from "@/components/ui/Main/page";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppContext } from "@/app/AppContext";
import useResizeEffect from "@/app/hooks/useResizeEffect";

export default function HomeUI(props: PropsWithChildren) {
  const {
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
  } = useAppContext();

  useResizeEffect(() => {
    setIsSmallScreen(window.innerWidth < 768);

    if (window.innerWidth < 768 && !initialSmallScreen) {
      setShowSidebar(false);
      setInitialSmallScreen(true);
    }
  });

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
