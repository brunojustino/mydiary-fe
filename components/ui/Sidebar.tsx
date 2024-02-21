"use client";

import React, { useState } from "react";
import classNames from "classnames";
import Link from "next/link";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";

import { defaultNavItems, NavItem } from "./defaultNavItems";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  CalendarIcon,
  FolderIcon,
  HomeIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  CurrencyDollarIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { ClipboardListIcon } from "lucide-react";

type Props = {
  collapsed: boolean;
  navItems?: NavItem[];
  setCollapsed(collapsed: boolean): void;
  shown: boolean;
};
const Sidebar = ({
  collapsed,
  navItems = defaultNavItems,
  shown,
  setCollapsed,
}: Props) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <div
      className={classNames({
        "bg-white text-black fixed md:static md:translate-x-0 z-20  ": true,
        "transition-all duration-300 ease-in-out": true,
        "w-[300px]": !collapsed,
        "w-20": collapsed,
        "-translate-x-full": !shown,
      })}
    >
      <div
        className={classNames({
          "flex flex-col justify-between h-screen sticky inset-0 w-full": true,
        })}
      >
        {/* logo and collapse button */}
        {/* <div
          className={classNames({
            "flex items-center border-b border-b-indigo-800 transition-none":
              true,
            "p-4 justify-between": !collapsed,
            "py-4 justify-center": collapsed,
          })}
        >
          {!collapsed && <span className="whitespace-nowrap">My Logo</span>}
          <button
            className="grid place-content-center hover:bg-indigo-800 w-10 h-10 rounded-full opacity-0 md:opacity-100"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Icon className="w-5 h-5" />
          </button>
        </div> */}

        <nav className="flex-grow">
          <ul
            className={classNames({
              "my-2 flex flex-col gap-2 items-stretch": true,
            })}
          >
            <li
              className={classNames({
                "rounded-full p-2 mx-1 gap-4 ": !collapsed,
                "rounded-full p-2 mx-1 p-2": collapsed,
                "flex gap-2": true,
              })}
            >
              {/* <div className="flex gap-2"> */}
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className="h-12 w-12"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <span>
                {!collapsed}{" "}
                <button
                  className={classNames({
                    "grid place-content-center text-black border bg-white w-8 h-8 rounded-full opacity-0 md:opacity-100":
                      true,
                    // "transition-colors duration-300": true, //animation
                    "transition-all duration-300 ease-in-out": true,
                    "mx-1 gap-4 relative left-[202px] top-[10px]": !collapsed,
                    "p-2 mx-3 w-10 h-10 relative left-[-16px] top-[10px]":
                      collapsed,
                  })}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <Icon className="w-5 h-5" />
                </button>
              </span>
              {/* </div> */}
            </li>
            <li
              className={classNames({
                flex: true, //colors
                "transition-colors duration-300": true, //animation
                "rounded-md mx-auto": !collapsed,
                "rounded-full p-2 mx-3 w-10 h-10 hover:border": collapsed,
              })}
              onClick={() => setCollapsed(false)}
            >
              {collapsed && <CalendarIcon className="w-6 h-6" />}

              {!collapsed && (
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="rounded-md border "
                />
              )}
            </li>
            <li
              className={classNames({
                flex: true, //colors
                "transition-colors duration-300 justify-center": true,
                "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                "rounded-full p-2 mx-3 w-10 h-10 hover:border": collapsed,
              })}
            >
              <div className="flex">
                <ClipboardListIcon className="w-6 h-6" />{" "}
                <div
                  className={classNames({
                    flex: true,
                    "w-24 ml-2": !collapsed,
                  })}
                >
                  <span>{!collapsed && "Tasks"}</span>
                  {!collapsed && (
                    <PlusCircleIcon className="w-6 h-6 hover:border" />
                  )}
                </div>
                {/* <PlusCircleIcon className="w-6 h-6" />{" "} */}
              </div>
            </li>
            <li
              className={classNames({
                flex: true, //colors
                "transition-colors duration-300 justify-center": true,
                "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                "rounded-full p-2 mx-3 w-10 h-10 hover:border": collapsed,
              })}
            >
              <div className="flex">
                <CurrencyDollarIcon className="w-6 h-6" />{" "}
                <div
                  className={classNames({
                    flex: true,
                    "w-24 ml-2": !collapsed,
                  })}
                >
                  <span>{!collapsed && "Expenses"}</span>
                  {!collapsed && (
                    <PlusCircleIcon className="w-6 h-6 hover:border" />
                  )}
                </div>
                {/* <PlusCircleIcon className="w-6 h-6" />{" "} */}
              </div>
            </li>

            {/* {navItems.map((item, index) => {
              return (
                <li
                  key={index}
                  className={classNames({
                    "hover:border flex": true, //colors
                    "transition-colors duration-300": true, //animation
                    "rounded-md p-2 mx-3 gap-4 ": !collapsed,
                    "rounded-full p-2 mx-3 w-10 h-10": collapsed,
                  })}
                >
                  <Link href={item.href} className="flex gap-2">
                    {item.icon} <span>{!collapsed && item.label}</span>
                  </Link>
                </li>
              );
            })} */}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default Sidebar;
