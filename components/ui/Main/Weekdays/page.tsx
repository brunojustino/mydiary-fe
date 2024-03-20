import { raleway } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/app/AppContext";
import { useState, useEffect } from "react";

const Weekdays = () => {
  const { date, setDate } = useAppContext();
  const [weekdays, setWeekdays] = useState<Record<string, Date>>({});

  useEffect(() => {
    const getWeekdays = (selectedDate: Date) => {
      const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const startDate = new Date(selectedDate);
      startDate.setDate(selectedDate.getDate() - selectedDate.getDay()); // Adjust to start from Sunday

      const weekdaysObj: Record<string, Date> = {};
      let currentDate = new Date(startDate);

      for (let i = 0; i < 7; i++) {
        weekdaysObj[weekdays[i]] = new Date(currentDate); // Store the full date
        currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
      }

      return weekdaysObj;
    };

    setWeekdays(getWeekdays(date || new Date())); // Use current date if not provided
  }, [date]);

  const handleDayClick = (clickedDate: Date) => {
    console.log("clickedDate", clickedDate);
    if (clickedDate.getTime() !== date?.getTime()) {
      setDate(clickedDate);
    }
  };

  return (
    <div className={`${raleway.className} flex font-medium`}>
      {Object.entries(weekdays).map(([day, date2]) => (
        <span
          key={day}
          onClick={() => handleDayClick(date2)}
          className={cn(
            `bg-white border-2 border-black ${
              day === "Sun" ? "" : "ml-[-2px]"
            } rounded-l-none rounded-tl-md rounded-r-xl border-b-0 rounded-br-none w-18 text-center`,
            {
              "bg-black text-white":
                date2.getTime() ===
                (date instanceof Date ? date.getTime() : date),
            }
          )}
        >
          {day}
        </span>
      ))}
    </div>
  );
};

export default Weekdays;
