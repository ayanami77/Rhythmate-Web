import { useState } from "react";
import { AnalyticsLeftButton, AnalyticsRightButton } from "./AnalyticsArrowButton";
import { AnalyticsBarChart } from "./AnalyticsBarChart";
import { AnalyticsCard } from "./AnalyticsCard";
import { useQueryWeeklyReports } from "../api/hooks/useQueryWeeklyReport";

// type Report = {
//   achievedQuests: number;
//   failedQuests: number;
//   achievementRate: number;
//   completeTotal: number;
// };

// const DataItem: Report[] = [
//   {
//     achievedQuests: 52,
//     failedQuests: 14,
//     achievementRate: 74,
//     completeTotal: 5,
//   },
//   {
//     achievedQuests: 63,
//     failedQuests: 11,
//     achievementRate: 85,
//     completeTotal: 6,
//   },
//   {
//     achievedQuests: 25,
//     failedQuests: 58,
//     achievementRate: 31,
//     completeTotal: 3,
//   },
//   {
//     achievedQuests: 36,
//     failedQuests: 87,
//     achievementRate: 9,
//     completeTotal: 2,
//   },
// ];
// const graphData: number[][] = [
//   [6, 3, 1, 4, 5, 7, 8],
//   [2, 4, 4, 8, 6, 4, 2],
//   [4, 2, 2, 3, 6, 4, 2],
//   [1, 2, 1, 5, 1, 2, 6],
// ];

export const AnalyticsPresenter = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  // const [graphDataIndex, setGraphDataIndex] = useState<number>(0);

  const { data: DataItem, isLoading } = useQueryWeeklyReports();

  // 日付の配列の作成
  const dateArray = DataItem?.length
    ? DataItem.map((item) => ({
        start: new Date(item.start_date).getMonth() + 1 + "/" + new Date(item.start_date).getDate(),
        end: new Date(item.end_date).getMonth() + 1 + "/" + new Date(item.end_date).getDate(),
      }))
    : [];

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? (DataItem ? DataItem.length - 1 : 0) : prevIndex - 1));
    // setGraphDataIndex((prevIndex) => (prevIndex === 0 ? (graphData ? graphData.length - 1 : 0) : prevIndex - 1));
  };
  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === (DataItem ? DataItem.length - 1 : 0) ? 0 : prevIndex + 1));
    // setGraphDataIndex((prevIndex) => (prevIndex === (graphData ? graphData.length - 1 : 0) ? 0 : prevIndex + 1));
  };

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : DataItem?.length ? (
        <div className="flex flex-col items-center w-fit mx-auto">
          <div className="flex w-full justify-between items-center">
            <AnalyticsLeftButton onClickFn={handleClickPrev} />
            <div className="flex">
              <p className="text-xl mx-2 block text-center font-bold">
                {dateArray[currentIndex].start} ～ {dateArray[currentIndex].end}の週
              </p>
            </div>
            <AnalyticsRightButton onClickFn={handleClickNext} />
          </div>
          <div className="grid grid-cols-2 gap-6 mt-6">
            <AnalyticsCard
              title={"達成したクエストの数"}
              data={DataItem[currentIndex].completed_quests}
              color={"#E0201B"}
              isRate={false}
            />
            <AnalyticsCard
              title={"失敗したクエストの数"}
              data={DataItem[currentIndex].failed_quests}
              color={"#0087EE"}
              isRate={false}
            />
            <AnalyticsCard
              title={"達成率"}
              data={DataItem[currentIndex].completed_percentage}
              color={"#FFAA00"}
              isRate={true}
            />
            <AnalyticsCard
              title={"コンプリート日数"}
              data={DataItem[currentIndex].completed_days}
              color={"#28AC00"}
              isRate={false}
            />
          </div>
          <div className="flex justify-start w-full">
            <h1 className="text-lg mt-8 font-bold">曜日別クエスト達成状況</h1>
          </div>
          <AnalyticsBarChart data={DataItem[currentIndex].completed_quests_each_day} />
        </div>
      ) : (
        <div className="w-full gap-4 flex flex-col items-center mx-auto mt-24 text-xl">
          <div>週刊レポートがまだありません</div>
          <div>日曜日が終わるとレポートが作成されます</div>
        </div>
      )}
    </>
  );
};
