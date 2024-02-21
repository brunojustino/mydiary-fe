"use client";

import className from "classnames";
import React, { PropsWithChildren, useState } from "react";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";
import { ClipboardListIcon } from "lucide-react";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
  classname?: string;
};

const Tasks = ({ collapsed, setCollapsed, classname }: Props) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <li
      className={className({
        flex: true, //colors
        "transition-colors duration-300 justify-center": true,
        "rounded-md p-2 mx-3 gap-4 ": !collapsed,
        "rounded-full p-2 mx-3 w-10 h-10 hover:border": collapsed,
      })}
    >
      <div className="flex">
        <ClipboardListIcon className="w-6 h-6" />{" "}
        <div
          className={className({
            flex: true,
            "w-24 ml-2": !collapsed,
          })}
        >
          <span className="mr-1">
            {!collapsed && "Tasks"}
            {classname + "aaaa"}
          </span>
          {!collapsed && <PlusCircleIcon className="w-6 h-6 hover:border" />}
        </div>
        {/* <PlusCircleIcon className="w-6 h-6" />{" "} */}
      </div>
    </li>
  );
};

export default Tasks;
