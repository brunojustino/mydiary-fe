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
  const [diary, setDiary] = useState<Diary>();
  const [inputText, setInputText] = useState("");
  const [minHeight, setMinHeight] = useState(25);

  const { date } = useAppContext();

  const session = useSession();
  const userId = session.data?.user?.id;
  // console.log(formattedDate);

  useEffect(() => {
    console.log("date or user changed");
    const newDate = date ? new Date(date) : new Date();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const year = newDate?.getFullYear();
    const formattedDate = `${month}${day}${year}`;

    fetch(`/api/diary/${userId}?date=${formattedDate}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch diary");
        }
        return res.json();
      })
      .then((data) => {
        if (data.diary) {
          console.log(data.diary);
          setInputText(data.diary.content);
          setDiary(data.diary);
        } else {
          updateDiary();
          setInputText("");
        }
      })
      .catch((error) => {
        console.error("Error fetching diary:", error);
        // Handle error
      });
  }, [date, userId]);

  const updateDiary = async (updatedDiary?: Diary) => {
    const newDate = date ? new Date(date) : new Date();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");
    const year = newDate?.getFullYear();
    const formattedDate = `${month}${day}${year}`;

    try {
      console.log("updating diaruy" + formattedDate + " " + userId);
      const body = updatedDiary
        ? JSON.stringify(updatedDiary)
        : JSON.stringify({ content: "" });
      const response = await fetch(
        `/api/diary/${userId}?date=${formattedDate}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update Diary");
      }
      const updatedDiaryFromServer = await response.json();
      setDiary(updatedDiaryFromServer);
      setInputText(updatedDiaryFromServer.content);
    } catch (error) {
      console.error("Error updating Diary:", error);
      alert("Failed to update Diary");
    }
  };

  const handleDiaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    const updatedDiary = { ...diary, content: e.target.value };
    const lines = e.target.value.split("\n").length;
    setMinHeight(Math.max(25, lines));
    // console.log(updatedDiary.content);
    //@ts-ignore
    updateDiary(updatedDiary);
  };

  return (
    <div className={`${girlFont.className} `}>
      {/* <div className={`grow-wrap`} data-replicatedvalue={inputText}> */}
      <textarea
        value={inputText}
        onChange={handleDiaryChange}
        rows={minHeight + 1}
        style={{ minHeight: `${minHeight}em` }}
        className={`rounded-l-none border-2 border-black pl-2 text-md tracking-tight w-full overflow-hidden resize-none`}
      />
      {/* </div> */}
    </div>
  );
};

export default DiaryUI;
