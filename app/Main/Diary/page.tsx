import { Textarea } from "@/components/ui/textarea";
import girlFont from "@/lib/fonts";
import classNames from "classnames";
import { useState } from "react";

// const girlFont = The_Girl_Next_Door({
//   weight: "400",
//   style: "normal",
//   subsets: ["latin"],
// });

const Diary = () => {
  const [inputText, setInputText] = useState("");
  const [textHeight, setTextHeight] = useState("600px");
  const [minHeight, setMinHeight] = useState(20);
  return (
    <div className={`${girlFont.className} `}>
      {/* <div className={`grow-wrap`} data-replicatedvalue={inputText}> */}
      <textarea
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
          const lines = e.target.value.split("\n").length;
          setMinHeight(Math.max(20, lines)); // Ensure minHeight is at least 20
        }}
        rows={minHeight + 1}
        style={{ minHeight: `${minHeight}em` }}
        className={`rounded-l-none border-2 border-black pl-2 text-md tracking-tight w-full overflow-hidden `}
      />
      {/* </div> */}
    </div>
  );
};

export default Diary;
