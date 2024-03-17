import { Textarea } from "@/components/ui/textarea";
import { girlFont } from "@/lib/fonts";
import classNames from "classnames";
import React, { useState, useEffect } from "react";
import { Diary } from "@prisma/client";
import { useAppContext } from "@/app/AppContext";
import { useSession } from "next-auth/react";

// const girlFont = The_Girl_Next_Door({
//   weight: "400",
//   style: "normal",
//   subsets: ["latin"],
// });

const DiaryUI = () => {
  const [inputText, setInputText] = useState("");
  const [minHeight, setMinHeight] = useState(25);
  const { date } = useAppContext();
  const newDate = date ? new Date(date) : new Date();
  const month = String(newDate.getMonth() + 1).padStart(2, "0");
  const day = String(newDate.getDate()).padStart(2, "0");
  const year = newDate?.getFullYear();

  const formattedDate = `${month}${day}${year}`;
  console.log(formattedDate);
  useEffect(() => {
    fetch(`/api/diary/${formattedDate}`)
      .then((res) => res.json())
      .then((data) => {
        setInputText(data.diary.content);

        const d = date?.getDate();
      });
  }, [date, formattedDate]);

  return (
    <div className={`${girlFont.className} `}>
      {/* <div className={`grow-wrap`} data-replicatedvalue={inputText}> */}
      <textarea
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          const lines = e.target.value.split("\n").length;
          setMinHeight(Math.max(25, lines)); // Ensure minHeight is at least 20
        }}
        rows={minHeight + 1}
        style={{ minHeight: `${minHeight}em` }}
        className={`rounded-l-none border-2 border-black pl-2 text-md tracking-tight w-full overflow-hidden resize-none`}
      />
      {/* </div> */}
    </div>
  );
};

export default DiaryUI;
