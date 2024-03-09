import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

type Props = {
  date: Date | undefined;
  setDate(date: Date): void;
};

const Weekdays = ({ date, setDate }: Props) => {
  return (
    <div className={`${raleway.className} flex font-medium`}>
      {/* <span className="bg-white border-2 border-black rounded-l-none rounded-tl-sm rounded-r-2xl border-b-0 rounded-br-none w-14 text-center">
        Seg
      </span> */}

      {weekDays.map((item, index) => {
        return (
          <span
            key={index}
            className={cn(
              `bg-white border-2 border-black ${
                index === 0 ? "" : "ml-[-2px]"
              } rounded-l-none rounded-tl-md rounded-r-xl border-b-0 rounded-br-none w-18 text-center ${
                index === 3 ? "bg-black text-white" : ""
              }`
            )}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};
export default Weekdays;
