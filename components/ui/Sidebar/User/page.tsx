"use client";

import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

type Props = {
  collapsed: boolean;
  setCollapsed(collapsed: boolean): void;
  showSideBar: boolean;
  setShowSidebar(shown: boolean): void;
};

const User = ({
  collapsed,
  setCollapsed,
  showSideBar,
  setShowSidebar,
}: Props) => {
  const session = useSession();
  const Icon = collapsed ? ChevronDoubleRightIcon : ChevronDoubleLeftIcon;
  return (
    <li
      className={classNames({
        "rounded-full p-2 mx-1 gap-4 ": !collapsed,
        "rounded-full p-2 mx-1 p-2": collapsed,
        "flex gap-2": true,
      })}
    >
      {/* <div className="flex gap-2"> */}
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
      <div className="flex justify-center">
        <div
          className={classNames({
            hidden: collapsed,
            "flex flex-col": true,
          })}
        >
          <div>{session.data?.user ? session.data.user.name : "John Doe"}</div>
          <div className="m-auto"> Diary </div>
        </div>
        <span>
          {" "}
          {/* Collapse icon*/}
          {!collapsed}
          {/* TODO FIX !collapsed icon position */}
          <button
            className={classNames({
              "grid place-content-center text-slate-700  w-6 h-6  opacity-0 md:opacity-100 hover:border-b border-black":
                true,

              "transition-all duration-300 ease-in-out  ": true,
              "mx-1 gap-4 relative left-[130px] top-[10px]": !collapsed,
              "p-2 mx-3 w-10 h-10 relative left-[-16px] top-[10px]": collapsed,
            })}
            onClick={() => setCollapsed(!collapsed)}
            // onClick={() => setShowSidebar(!showSideBar)}
          >
            <Icon className="w-5 h-5 " />
          </button>
        </span>
      </div>
      {/* </div> */}
    </li>
  );
};

export default User;
