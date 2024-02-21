const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];

const Weekdays = () => {
  return (
    <div className="flex">
      {/* <span className="bg-white border-2 border-black rounded-l-none rounded-tl-sm rounded-r-2xl border-b-0 rounded-br-none w-14 text-center">
        Seg
      </span> */}

      {weekDays.map((item, index) => {
        return (
          <span
            key={index}
            className="bg-white border-2 border-black rounded-l-none rounded-tl-md rounded-r-2xl border-b-0 rounded-br-none w-14 text-center"
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};
export default Weekdays;
