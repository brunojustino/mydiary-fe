"use client";

import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  PlusCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
};

const Expenses = ({ collapsed, setCollapsed }: Props) => {
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
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
          <span className="mr-1">{!collapsed && "Expenses"}</span>
          {!collapsed && <PlusCircleIcon className="w-6 h-6 hover:border" />}
        </div>
        {/* <PlusCircleIcon className="w-6 h-6" />{" "} */}
      </div>
    </li>
  );
};

export default Expenses;
