// import { FC, useState } from "react";

// type Props = {
//   isCurrent: boolean;
// }

export const QuestsIcon = () => {
  // const [color, setColor] = useState("text-rhyth-gray");
  // const handleIconColor = (isCurrent: boolean) => {
  //   if (isCurrent) {
  //     setColor("text-rhyth-orange");
  //   } else {
  //     setColor("text-rhyth-gray");
  //   }
  //   return color;
  // }

  return (
    <svg
      className={`w-6 h-6 text-rhyth-gray`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 4h3c.6 0 1 .4 1 1v15c0 .6-.4 1-1 1H6a1 1 0 0 1-1-1V5c0-.6.4-1 1-1h3m0 3h6m-6 5h6m-6 4h6M10 3v4h4V3h-4Z"
      />
    </svg>
  );
};
