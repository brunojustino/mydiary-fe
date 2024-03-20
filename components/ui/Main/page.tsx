import Weekdays from "./Weekdays/page";
import DiaryUI from "./Diary/page";
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
        "flex flex-col ml-8 mt-8": !isSmallScreen,
        "flex flex-col ": isSmallScreen,
      })}
    >
      <Weekdays />
      <DiaryUI />
    </div>
  );
};
export default Main;
