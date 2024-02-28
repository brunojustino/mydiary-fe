"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import SideBar from "@/app/SideBar/page";
import Main from "@/app/Main/page";

export default function Home(props: PropsWithChildren) {
  const [collapsed, setSidebarCollapsed] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  //also gonna need date and user to pass to the sidebar and the main page
  //in the sidebar we have calendar, task and expenses component.
  //in the calendar we set the date and load info based on the date selected
  //in the tasks and expenses we load inof based on the selected date
  //in the main page we have a week days tab from sun to sat
  //and have the main page containing the diary
  //everything according to the current date
  //
  console.log(date);
  return (
    <div
      className={classNames({
        "grid  min-h-screen p-3": true,
        "grid-cols-sidebar": !collapsed,
        "grid-cols-sidebar-collapsed": collapsed,
        "transition-[grid-template-columns] duration-300 ease-in-out": true,
      })}
    >
      <SideBar
        collapsed={collapsed}
        setCollapsed={setSidebarCollapsed}
        showSideBar={showSidebar}
        setShowSidebar={setShowSidebar}
        date={date}
        setDate={setDate}
      />
      <Main />
    </div>
  );
}
