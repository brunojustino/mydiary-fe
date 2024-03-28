"use client";

import classNames from "classnames";
import React, { PropsWithChildren, useState } from "react";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import * as actions from "@/app/actions";

import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/outline";

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  strokeWidth={1.5}
  stroke="currentColor"
  className="w-6 h-6"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
  />
</svg>;

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
  const Logout = ArrowRightEndOnRectangleIcon;
  return (
    <li
      className={classNames({
        "rounded-full p-2 mx-1 gap-4 w-full": !collapsed,
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
          src={
            session.data?.user
              ? session.data.user.image || "https://github.com/shadcn.png"
              : "https://github.com/shadcn.png"
          }
          className="h-12 w-12"
        />
        <span
          className={classNames({
            "rounded-full": true,
            "fixed top-[45px] left-[62px]": !collapsed,
            "fixed top-[45px] left-[40px]": collapsed,
          })}
        >
          <form action={actions.signOut}>
            <Button
              type="submit"
              className="p-0 m-0 rounded-full bg-zinc-100/70 hover:bg-zinc-100/90  h-5 w-5 "
              variant="ghost"
            >
              <Logout className="w-4 h-4 " />
            </Button>
          </form>
        </span>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex justify-center">
        <div
          className={classNames({
            hidden: collapsed,
            "flex flex-col": true,
          })}
        >
          <div className="w-36 text-center">
            {session.data?.user ? session.data.user.name : "John Doe"}
          </div>
          <div className="m-auto"> Diary </div>
        </div>
        <span>
          {!collapsed}

          <button
            className={classNames({
              "grid place-content-center text-slate-700  w-6 h-6  opacity-0 md:opacity-100 hover:border-b border-black":
                true,

              "transition-all duration-300 ease-in-out  ": true,
              "mx-1 gap-4 relative left-[50px] top-[10px]": !collapsed,
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
