import Weekdays from "@/app/Main/Weekdays/page";
import Diary from "./Diary/page";
const Main = () => {
  return (
    <div className="flex flex-col ml-8 ">
      <Weekdays />
      <Diary />
    </div>
  );
};
export default Main;
