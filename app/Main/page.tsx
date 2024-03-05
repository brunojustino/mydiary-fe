import Weekdays from "@/app/Main/Weekdays/page";
import Diary from "./Diary/page";
import classNames from "classnames";

type Props = {
  isSmallScreen: boolean;
  date: Date | undefined;
  setDate(date: Date): void;
};

const Main = ({ isSmallScreen, date, setDate }: Props) => {
  return (
    <div
      className={classNames({
        "flex flex-col ml-8 ": !isSmallScreen,
        "flex flex-col ": isSmallScreen,
      })}
    >
      <Weekdays />
      <Diary />
    </div>
  );
};
export default Main;
