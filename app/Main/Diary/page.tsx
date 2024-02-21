import { Textarea } from "@/components/ui/textarea";
import { The_Girl_Next_Door } from "next/font/google";
import classNames from "classnames";

const girlFont = The_Girl_Next_Door({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const Diary = () => {
  return (
    <div className={`${girlFont.className} `}>
      <Textarea className="rounded-l-none border-2 border-black text-md leading-5 tracking-tight" />
    </div>
  );
};
export default Diary;
