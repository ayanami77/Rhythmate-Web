import { useEffect, useState } from "react";
import { Loading, LoadingContainer } from "../../common/components";
import { useQueryWeeklyReportSummary, useQueryWeeklyReports } from "../api/weeklyReport/hooks/useQueryWeeklyReport";
import { AnalyticsBarChart } from "./AnalyticsBarChart";
import { AnalyticsCard } from "./AnalyticsCard";
import { AnalyticsAIFeedback } from "./AnalyticsAIFeedback";
import { AnalyticsSwitchButton } from "./AnalyticsSwitchButton";
import { formatDateTimeJP } from "../../../pkg/util/dayjs";

export const AnalyticsPresenter = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const { data: weeklyReports, isLoading: isLoadingWeeklyReports } = useQueryWeeklyReports();
  const {
    data: summaryData,
    refetch: refetchSummary,
    isFetching: isFetchingSummary,
  } = useQueryWeeklyReportSummary(currentIndex);
  useEffect(() => {
    refetchSummary();
  }, [currentIndex]);

  // TODO: 日付の配列の作成
  const dateArray = weeklyReports?.length
    ? weeklyReports.map((item) => ({
        start: formatDateTimeJP(item.start_date),
        end: formatDateTimeJP(item.end_date),
      }))
    : [];

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? (weeklyReports ? weeklyReports.length - 1 : 0) : prevIndex - 1));
  };

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === (weeklyReports ? weeklyReports.length - 1 : 0) ? 0 : prevIndex + 1));
  };
  return (
    <>
      {isLoadingWeeklyReports ? (
        <LoadingContainer>
          <Loading />
        </LoadingContainer>
      ) : weeklyReports?.length ? (
        <div className="flex flex-col items-center w-fit mx-auto">
          <div className="flex justify-between  w-full">
            {
              <AnalyticsSwitchButton
                onClickFn={handleClickPrev}
                direction="left"
                isEdgy={currentIndex === dateArray.length - 1}
              />
            }
            <p className="text-xl tracking-wider mx-2 block font-cp-font text-center font-bold text-rhyth-gray">
              {dateArray[currentIndex].start} ～ {dateArray[currentIndex].end}
            </p>
            {<AnalyticsSwitchButton onClickFn={handleClickNext} direction="right" isEdgy={currentIndex === 0} />}
          </div>
          <div className="grid grid-cols-2 gap-6 w-full mt-6">
            <AnalyticsCard
              title={"達成したクエスト数"}
              data={weeklyReports[currentIndex].completed_quests}
              color={"#E0201B"}
              isRate={false}
            />
            <AnalyticsCard
              title={"失敗したクエスト数"}
              data={weeklyReports[currentIndex].failed_quests}
              color={"#0087EE"}
              isRate={false}
            />
            <AnalyticsCard
              title={"達成率"}
              data={weeklyReports[currentIndex].completed_percentage}
              color={"#FFAA00"}
              isRate={true}
            />
            <AnalyticsCard
              title={"コンプリート日数"}
              data={weeklyReports[currentIndex].completed_days}
              color={"#28AC00"}
              isRate={false}
            />
          </div>
          <div className="flex justify-start w-full">
            <h1 className="mt-8 font-cp-font tracking-widest text-rhyth-gray text-lg font-bold ">
              曜日別クエスト達成状況
            </h1>
          </div>
          <AnalyticsBarChart data={weeklyReports[currentIndex].completed_quests_each_day} />
          <AnalyticsAIFeedback summaryData={summaryData ?? ""} isLoading={isFetchingSummary} />
        </div>
      ) : (
        <div className="w-full gap-4 flex flex-col items-center mx-auto mt-24 text-lg text-center">
          <span>
            週間レポートがまだありません。
            <br />
            日曜日が終わるとレポートが作成されます。
          </span>
        </div>
      )}
    </>
  );
};
