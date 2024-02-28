"use client";

import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";

import { Calendar } from "@/components/ui/calendar";

import { CalendarIcon } from "@heroicons/react/24/outline";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
  date: Date | undefined;
  setDate(date: Date): void;
};

const CalendarLi = ({ collapsed, setCollapsed, date, setDate }: Props) => {
  return (
    <li
      className={classNames({
        flex: true,
        "transition-colors duration-300 bg-white": true, //animation
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
          onDayClick={setDate}
          className="rounded-sm border w-[280px] flex justify-center border-black"
        />
      )}
    </li>
  );
};

export default CalendarLi;
