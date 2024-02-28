"use client";

import React, { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

import User from "./User/page";
import CalendarLi from "./Calendar/page";
import Tasks from "./Tasks/page";
import Expenses from "./Expenses/page";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
  showSideBar: boolean;
  setShowSidebar(showSideBar: boolean): void;
  date: Date | undefined;
  setDate(date: Date): void;
};
const Sidebar = ({
  collapsed,
  showSideBar,
  setShowSidebar,
  setCollapsed,
  date,
  setDate,
}: Props) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;

  return (
    <div
      className={classNames({
        " text-black fixed md:static md:translate-x-0 z-20  ": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-20": collapsed,
        "-translate-x-full": !showSideBar,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between  sticky inset-0 w-full": true,
        })}
      >
        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            <User
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              showSideBar={showSideBar}
              setShowSidebar={setShowSidebar}
            />
            <CalendarLi
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              date={date}
              setDate={setDate}
            />
            <Tasks
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              className="bg-white"
            />
            <Expenses
              collapsed={collapsed}
              setCollapsed={setCollapsed}
              className="bg-white"
            />
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
