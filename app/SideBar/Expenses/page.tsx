import { cn } from "@/lib/utils";

import React, { PropsWithChildren, useState } from "react";

import girlFont from "@/lib/fonts";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
  className?: string;
};

const Expenses = ({ collapsed, setCollapsed, className }: Props) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <li
      className={cn(className, girlFont.className, {
        "flex flex-col": true,
        "transition-colors duration-300 justify-center": true,
        "rounded-md p-2 mx-3 gap-4 ": !collapsed,
        "rounded-full p-2 mx-3 w-10 h-10 hover:border": collapsed,
      })}
      onClick={() => setCollapsed(false)}
    >
      <div className="flex justify-center">
        <CurrencyDollarIcon className="w-6 h-6" />{" "}
        <div
          className={cn({
            flex: true,
            "ml-2": !collapsed,
          })}
        >
          <span className="mr-1 text-xl underline">
            {!collapsed && "Expenses"}
          </span>
          {!collapsed && <PlusCircleIcon className="w-6 h-6 hover:border" />}
        </div>
      </div>

      <ul>
        {/* {tasksList.map((task) => {
          return (
            <li key={task.id}>
              <Task task={task} />
            </li>
          );
        })} */}
      </ul>
    </li>
  );
};

export default Expenses;
