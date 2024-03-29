import { QuestBoard } from "./QuestBoard";
import { QuestList } from "./QuestList";
import { formatDateJP, getToday, getTodayEn, now } from "../../../pkg/util/dayjs";
import { useQueryQuestList } from "../api/quest/hooks/useQueryQuest";
import { QuestBoardNoData } from "./QuestBoardNoData";
import { useState } from "react";
import { QuestListNoData } from "./QuestListNoData";
import { Quest } from "../../../api/quest/model";
import { Loading, LoadingContainer } from "../../common/components";

const filterQuestsByDayOfTheWeek = (questList: Quest[]) => {
  const todaysDayOfTheWeek = getTodayEn().toUpperCase();

  return questList.filter((quest) => {
    const isToday: boolean = quest.days.some((day) => day === todaysDayOfTheWeek);
    return isToday ? quest : null;
  });
};

const sortQuestsByTime = (questList: Quest[]) => {
  return questList.sort((a, b) => {
    return a.startsAt > b.startsAt ? 1 : -1;
  });
};

export const QuestsPresenter = () => {
  const { data, isLoading } = useQueryQuestList();

  // 曜日でフィルターする
  const filteredQuestsData = filterQuestsByDayOfTheWeek(data ?? []);

  // 時間順でソートする
  const sortedQuestsData = sortQuestsByTime(filteredQuestsData);

  const nextQuestList = sortedQuestsData.filter((value) => value.state === "INACTIVE");
  const finishedQuestList = sortedQuestsData.filter((value) => value.state === "ACTIVE");
  const currentQuest = nextQuestList[0];

  const [view, setView] = useState<"NEXT" | "FINISHED">("NEXT");

  return (
    <>
      <h1 className="text-xl font-bold">
        {formatDateJP(now())}
        {`(${getToday()})`}のクエスト
      </h1>
      {isLoading ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          <div className="bg-white">
            {currentQuest ? <QuestBoard currentQuest={currentQuest} /> : <QuestBoardNoData />}
          </div>
          <div className={`flex flex-col gap-2 w-full p-3 mt-4 bg-gray-100 rounded-md `}>
            <div className="flex items-center gap-2">
              <button
                className={`px-4 py-2 text-base font-bold rounded-lg ${
                  view === "NEXT" ? "text-white bg-blue-400" : "bg-gray-300 text-black "
                }`}
                onClick={() => setView("NEXT")}
              >
                次のクエスト
              </button>
              <button
                className={`px-4 py-2 text-base font-bold rounded-lg ${
                  view === "FINISHED" ? "text-white bg-blue-400" : "bg-gray-300 text-black "
                }`}
                onClick={() => setView("FINISHED")}
              >
                終了クエスト
              </button>
            </div>
            {view === "NEXT" ? (
              nextQuestList.slice(1)?.length ? (
                <QuestList questList={nextQuestList.slice(1)} />
              ) : (
                <QuestListNoData view={view} />
              )
            ) : finishedQuestList?.length ? (
              <QuestList questList={finishedQuestList} />
            ) : (
              <QuestListNoData view={view} />
            )}
          </div>
        </>
      )}
    </>
  );
};
