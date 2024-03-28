import { FC } from "react";

type Props = {
  direction: "left" | "right";
  isEdgy: boolean;
  onClickFn: () => void;
};

export const AnalyticsSwitchButton: FC<Props> = ({ onClickFn, direction, isEdgy }) => {
  return (
    <button onClick={onClickFn} disabled={isEdgy}>
      {direction === "left" ? (
        <svg
          className={`w-6 h-6 text-rhyth-gray ${isEdgy ? "w-6 h-6 text-transparent" : "w-6 h-6 text-rhyth-gray"} `}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          />
        </svg>
      ) : (
        <svg
          className={`w-6 h-6 text-rhyth-gray ${isEdgy ? "w-6 h-6 text-transparent" : "w-6 h-6 text-rhyth-gray"} `}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
          />
        </svg>
      )}
    </button>
  );
};
