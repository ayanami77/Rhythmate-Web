import { ChangeEvent, FC } from "react";

type Props = {
  handleDates: (date: number) => void;
  date: string;
  dates: number[];
  value: number;
};

export const NewDayOfTheWeek: FC<Props> = ({ handleDates, date, dates, value }) => {
  return (
    <>
      <input
        type="checkbox"
        className="hidden peer"
        value={value}
        id={`${value}`}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleDates(Number(e.target.value))}
      />
      <label
        className={`px-2 py-1 rounded border-2 cursor-pointer ${
          dates.some((v) => v === value) ? "bg-blue-400 text-white" : "bg-white text-black"
        }`}
        htmlFor={`${value}`}
      >
        {date}
      </label>
    </>
  );
};
