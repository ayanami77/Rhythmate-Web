import { useNavigate } from "@tanstack/react-router";
import { ManageProgressBar } from "./ManageProgressBar";
import { FC } from "react";
import { formatDateTimeOnlyTime } from "../../../pkg/util/dayjs";
import { ClockIcon } from "../../common/components/icons/ClockIcon";
import { calcExp } from "../../common/funcs/calcExp";
import { convertEnToJPWeekday } from "../common/funcs";
import { Day, Difficulty } from "../../../api/quest/types";

const convertENToJPWeekdayString = (weekDays: Day[]) => {
  const result = weekDays.map((day) => convertEnToJPWeekday(day)).join("・");
  return result;
};

type Props = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  minutes: number;
  difficulty: Difficulty;
  days: Day[];
  continuationLevel: number;
};

export const ManageQuestCard: FC<Props> = (props) => {
  const { id, title, description, startsAt, minutes, days, difficulty, continuationLevel } = props;
  const navigate = useNavigate();

  return (
    <div className="w-full h-auto  bg-white border-2 border-rhyth-light-gray border-solid rounded-lg shadow-lg">
      <div className="px-4 py-2">
        <div className="flex items-center py-2">
          <h1 className="font-bold text-lg text-rhyth-dark-blue">{title}</h1>
          <button className="p-1 ml-auto" onClick={() => navigate({ to: `/manage/edit`, search: { quest_id: id } })}>
            <div className="flex items-center gap-2 justify-center">
              <svg
                className="w-6 h-6 text-rhyth-blue"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"
                />
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                />
              </svg>
            </div>
          </button>
        </div>
        <hr className="h-1.5 bg-rhyth-blue" />
        <div className="flex items-center gap-2 text-sm mt-2">
          <div className="font-cp-font text-white bg-rhyth-gray py-1 px-3 rounded-full tracking-wider">
            <p>ひとこと</p>
          </div>
          <h3 className="font-bold text-rhyth-dark-blue">{description}</h3>
        </div>
        <div className="my-2 text-sm">
          <div className="w-[200px] flex justify-center items-center gap-2 text-white bg-rhyth-blue py-1 px-3 rounded-full">
            <ClockIcon />
            <p className="text-sm font-cp-font tracking-widest">クエスト実行タイム</p>
          </div>
          <h3 className="ml-2 my-2 text-lg font-bold text-rhyth-light-blue">{convertENToJPWeekdayString(days)}</h3>
          <div className="ml-2 flex items-center gap-4 font-bold">
            <span className="text-2xl text-rhyth-light-blue">{formatDateTimeOnlyTime(startsAt)}</span>
            <span className="text-lg text-rhyth-dark-blue">から</span>
            <span className="text-2xl text-rhyth-light-blue">{minutes}分間</span>
            <span className="text-lg text-rhyth-dark-blue">集中！</span>
          </div>
        </div>
      </div>
      <hr className="h-0.5 bg-rhyth-light-gray" />
      <div className="flex items-center h-24">
        <div className=" w-full h-full p-2">
          <div className="flex">
            <p className="font-cp-font text-rhyth-green mt-auto ml-1">継続レベル</p>
          </div>
          <ManageProgressBar level={continuationLevel} />
          <div className="flex justify-end items-center text-sm">
            <p className="font-cp-font tracking-[0.2em] text-white bg-rhyth-orange px-2 py-1 rounded-full">BONUS</p>
            <span className="ml-1 font-medium text-md text-rhyth-orange tracking-wider">&times;</span>
            <span className="ml-1 font-bold text-lg text-rhyth-orange tracking-wider">{continuationLevel}.0</span>
          </div>
        </div>
        <div className="bg-rhyth-red h-full flex flex-col justify-center items-center gap-2 font-cp-font text-[12px] tracking-wider rounded-br-md">
          <p className="text-white font-semibold">獲得Exp</p>
          <div className="flex justify-between items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              className="w-6 h-6 fill-rhyth-orange ml-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
              />
            </svg>
            <p className="text-white text-xl font-semibold text-right mr-3">{calcExp(difficulty, continuationLevel)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
