import { FC } from "react";
import { QuestListItem } from "./QuestListItem";
import { formatDateToTime } from "../../../pkg/util/dayjs";
import { Quest } from "../api/model";

type Props = {
  questList: Quest[];
};

export const QuestList: FC<Props> = (props) => {
  const { questList } = props;
  return (
    <div className="mt-3 flex flex-col gap-2 ">
      {questList.map((quest) => {
        return (
          <QuestListItem
            key={quest.id}
            title={quest.title}
            startsAt={formatDateToTime(quest.startsAt)}
            isDone={quest.state === "ACTIVE"}
            isSuccess={quest.isSucceeded}
            minutes={quest.minutes}
            difficulty={quest.difficulty}
            continuationLevel={quest.continuationLevel}
          />
        );
      })}
    </div>
  );
};
