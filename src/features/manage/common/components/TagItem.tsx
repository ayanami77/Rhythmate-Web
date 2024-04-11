import { FC } from "react";

type Props = {
  name: string;
  color: string;
};

export const TagItem: FC<Props> = ({ name, color }) => {
  const selectColorLabel = (color: string) => {
    switch (color) {
      case "Blue":
        return "text-rhyth-blue";
      case "Green":
        return "text-rhyth-green";
      case "Red":
        return "text-rhyth-red";
      case "Purple":
        return "text-rhyth-purple";
      case "Orange":
        return "text-rhyth-orange";
      case "Yellow":
        return "text-rhyth-yellow";
      case "LightBlue":
        return "text-rhyth-light-blue";
    }
  };

  return (
    <option
      className={`border-b border-rhyth-light-gray w-full h-hull font-bold flex items-center px-4 py-2 rounded-t-lg ${selectColorLabel(
        color,
      )}`}
      value={color}
    >
      {name}
    </option>
  );
};
