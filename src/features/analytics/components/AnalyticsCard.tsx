import { FC } from "react";

type Props = {
  title: string;
  data: number;
  color: string;
  isRate: boolean;
};

export const AnalyticsCard: FC<Props> = ({ title, data, color, isRate }) => {
  return (
    <div
      className={`text-lg border-[6px] w-full px-2 py-4 bg-white text-rhyth-dark-blue font-bold rounded-lg shadow`}
      style={{ borderColor: `${color}` }}
    >
      <h1 className="text-center text-sm">{title}</h1>
      <h1 className="text-center mt-4 text-4xl font-bold font-cp-font">
        {data}
        {isRate && <span>%</span>}
      </h1>
    </div>
  );
};
