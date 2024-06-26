import type { FC } from "react";
import type { Tag } from "../../../api/tag/model";
import { ManageSearchTagItem } from "./ManageSearchTagItem";

type Props = {
  tagItems: Tag[];
  tag: Tag;
  handleTag: (tag: Tag) => void;
};

export const ManageSearchTagsDropdown: FC<Props> = ({ tagItems, tag, handleTag }) => {
  const handleColorValue = (tagId: string) => {
    const selectTagItem = tagItems?.find((tagItem) => tagItem.id === tagId);
    switch (selectTagItem?.color) {
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
      default:
        return "text-rhyth-dark-blue";
    }
  };

  return (
    <select
      name="tag-color"
      id="tag-color"
      className={`bg-white border-2 border-rhyth-light-gray text-rhyth-dark-blue text-sm font-bold rounded-lg w-full p-2 shadow-sm ${handleColorValue(
        tag.id,
      )}`}
      onChange={(event) => {
        const selectedTag = tagItems?.find((tagItem) => tagItem.id === event.target.value) ?? {
          id: "",
          name: "",
          color: "",
        };
        handleTag(selectedTag);
      }}
      defaultValue={tag.id}
    >
      <option
        value=""
        className={
          "w-full bg-white text-rhyth-dark-blue border border-rhyth-light-gray font-medium rounded-lg text-sm px-5 py-2.5 inline-flex"
        }
      >
        タグを選択
      </option>
      {tagItems?.map((tagItem) => {
        return (
          <ManageSearchTagItem key={tagItem.id} tagId={tagItem.id} tagName={tagItem.name} tagColor={tagItem.color} />
        );
      })}
    </select>
  );
};
