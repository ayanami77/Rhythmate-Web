import { FC, useState } from "react";
import { Day, Difficulty } from "../../../api/quest/types";
import { DAYS, DIFFICULTIES } from "../common/constant/constant";
import { ManageDayOfTheWeekCheckBox } from "./ManageDayOfTheWeekCheckBox";
import { ManageDifficultyCheckBox } from "./ManageDifficultyCheckBox";
import { ModalBase } from "../../common/components/modal/ModalBase";
import { ModalHeaderCloseButton } from "../../common/components/modal/ModalHeaderCloseButton";

type Props = {
  onClickFn: () => void;
  filterDay: Day | "";
  setFilterDay: (day: Day | "") => void;
  filterDifficulties: Difficulty[];
  setFilterDifficulties: (difficulty: Difficulty[]) => void;
  setFilterActivation: (activation: boolean) => void;
};

export const ManageQuestSearchModal: FC<Props> = ({
  onClickFn,
  filterDay,
  setFilterDay,
  filterDifficulties,
  setFilterDifficulties,
  setFilterActivation,
}) => {
  const [day, setDay] = useState<Day | "">(filterDay);
  const [difficulties, setDifficulties] = useState<Difficulty[]>(filterDifficulties);

  const handleDay = (newDay: Day | "") => {
    if (newDay === day) {
      setDay("");
    } else {
      setDay(newDay);
    }
  };

  const handleDifficulty = (difficulty: Difficulty) => {
    if (difficulties.includes(difficulty)) {
      const newDifficulties = difficulties.filter((value) => value !== difficulty);
      setDifficulties(newDifficulties);
    } else {
      setDifficulties([...difficulties, difficulty]);
    }
  };

  return (
    <ModalBase onClickClose={onClickFn}>
      <div className="order relative bg-white rounded-lg shadow p-4">
        <ModalHeaderCloseButton onClickClose={onClickFn} />
        {/* <!-- Modal body --> */}
        <h1 className="text-xl text-center -mt-4 mb-2">クエスト検索</h1>
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center y-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#888888"
              className="mr-2 w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <p>実施曜日</p>
          </div>
          <div className="flex ml-auto">
            {DAYS.map((v, i) => {
              return (
                <ManageDayOfTheWeekCheckBox key={i} handleDay={handleDay} day={day} dayOfTheWeek={v} index={i + 1} />
              );
            })}
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#888888"
              className="mr-2 w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            <p>難易度</p>
            <div className="flex ml-auto">
              {DIFFICULTIES.map((v, i) => {
                return (
                  <ManageDifficultyCheckBox
                    key={i}
                    handleDifficulties={handleDifficulty}
                    difficulty={v}
                    filterDifficulties={filterDifficulties}
                  />
                );
              })}
            </div>
          </div>
          <button
            type="submit"
            onClick={() => {
              setFilterDay(day);
              setFilterDifficulties(difficulties);
              setFilterActivation(true);
              onClickFn();
            }}
            className="w-full text-white bg-[#0087EE] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            保存
          </button>
          <button
            type="submit"
            onClick={() => {
              setFilterDay("");
              setFilterDifficulties([]);
              setFilterActivation(false);
              onClickFn();
            }}
            className="w-full text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            条件をリセット
          </button>
        </div>
      </div>
    </ModalBase>
  );
};
