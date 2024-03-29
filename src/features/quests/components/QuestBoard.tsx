import { FC, useState } from "react";
import { formatDateTimeOnlyTime } from "../../../pkg/util/dayjs";
import { QuestBoardTimer } from "./QuestBoardTimer";
import useInterval from "../../common/hooks/useInterval";
import { CLOSED, DONE, ENGAGED, FORCE_STOP, NOT_STARTED_YET, OPEN, QuestStatus } from "../constant/constant";
import { useMutateQuest } from "../api/quest/hooks/useMutateQuest";
import { ConfirmModal, ClockIcon } from "../../common/components";
import { calcExp } from "../../common/funcs/calcExp";
import { getBaseTime, getDiffTime } from "../funcs/time";
import { Quest } from "../../../api/quest/model";

export const getIsStarted = (startedAt: string) => {
  return startedAt !== NOT_STARTED_YET;
};

type Props = {
  currentQuest: Quest;
};

export const QuestBoard: FC<Props> = (props) => {
  const { currentQuest } = props;
  const [startConfirmModalOpen, setStartConfirmModalOpen] = useState(false);
  const [finishConfirmModalOpen, setFinishConfirmModalOpen] = useState(false);
  const { startQuestMutation, finishQuestMutation, forceFinishQuestMutation } = useMutateQuest();

  const { status } = getBaseTime(
    currentQuest.startsAt,
    getIsStarted(currentQuest.startedAt),
    currentQuest.minutes,
    currentQuest.startedAt,
  );

  const [questStatus, setQuestStatus] = useState<QuestStatus>(status);

  useInterval(() => {
    const { baseTime, status } = getBaseTime(
      currentQuest.startsAt,
      getIsStarted(currentQuest.startedAt),
      currentQuest.minutes,
      currentQuest.startedAt,
    );

    const { diffHH, diffMM, diffSS } = getDiffTime(baseTime);

    if (status === FORCE_STOP && questStatus !== FORCE_STOP) {
      setQuestStatus(FORCE_STOP);
    }
    // クエスト解放へ切り替える
    if (diffHH === diffMM && diffMM === diffSS && questStatus === CLOSED) {
      setQuestStatus(OPEN);
    }
    // クエスト集中へ切り替える
    if (diffHH === diffMM && diffMM === diffSS && questStatus === OPEN) {
      setQuestStatus(ENGAGED);
    }
    // クエスト終了へ切り替える
    if (diffHH === diffMM && diffMM === diffSS && questStatus === ENGAGED) {
      setQuestStatus(DONE);
    }
  }, 1000);

  const onClickStartQuest = async () => {
    await startQuestMutation.mutateAsync({
      id: currentQuest.id,
    });
    setQuestStatus(ENGAGED);
  };

  const onClickFinishQuest = async () => {
    await finishQuestMutation.mutateAsync({
      id: currentQuest.id,
    });
    setQuestStatus(CLOSED);
  };

  const onClickForceFinishQuest = async () => {
    await forceFinishQuestMutation.mutateAsync({
      id: currentQuest.id,
    });
    setQuestStatus(CLOSED);
  };

  return (
    <div className="w-full min-h-[230px] mt-3 p-3 border-2 shadow rounded-lg">
      <div className="flex flex-col gap-1">
        <div className="flex justify-between gap-2">
          <div className="flex items-center gap-2">
            <ClockIcon />
            <span>
              {formatDateTimeOnlyTime(currentQuest.startsAt)} - {currentQuest.minutes}m
            </span>
            <div className="flex items-center gap-1 font-bold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                className="w-6 h-6 fill-red-500"
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
              <span className="text-red-500 text-lg">
                {calcExp(currentQuest.difficulty, currentQuest.continuationLevel)}
              </span>
            </div>
          </div>
          {getIsStarted(currentQuest.startedAt) && <span>開始: {formatDateTimeOnlyTime(currentQuest.startedAt)}</span>}
        </div>
        <h2 className="text-lg">{currentQuest.title}</h2>
        <div className="w-full h-[2px] bg-gray-200 rounded-md" />
        <span className="text-base">{currentQuest.description}</span>
        <div className="text-center font-bold mt-2 flex items-center justify-center gap-1">
          <span>
            {questStatus === CLOSED ? (
              <span>クエスト解放まで</span>
            ) : questStatus === OPEN ? (
              <span>クエスト解放中</span>
            ) : questStatus === ENGAGED ? (
              <span>残り時間</span>
            ) : (
              <span>クエスト終了</span>
            )}
          </span>
          <QuestBoardTimer
            startsAt={currentQuest.startsAt}
            isStarted={getIsStarted(currentQuest.startedAt)}
            minutes={currentQuest.minutes}
            startedAt={currentQuest.startedAt}
          />
        </div>
        {questStatus === CLOSED ? (
          <div className="text-black bg-gray-200 rounded-lg text-lg font-bold p-3 mt-4 text-center">クエスト未開放</div>
        ) : questStatus === OPEN ? (
          <button
            onClick={() => setStartConfirmModalOpen(true)}
            className="text-white bg-green-400 hover:bg-green-500 focus:ring-4 focus:ring-blue-300 rounded-lg text-lg font-bold p-3 mt-4 focus:outline-none"
          >
            クエストを開始する
          </button>
        ) : questStatus === ENGAGED ? (
          <div className="text-white bg-yellow-500 rounded-lg text-lg font-bold p-3 mt-4 text-center">
            クエストに集中しましょう
          </div>
        ) : questStatus === DONE ? (
          <button
            onClick={() => setFinishConfirmModalOpen(true)}
            className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-300 rounded-lg text-lg font-bold p-3 mt-4 focus:outline-none"
          >
            クエストを完了する
          </button>
        ) : (
          <button
            onClick={onClickForceFinishQuest}
            className="text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:ring-blue-300 rounded-lg text-lg font-bold p-3 mt-4 focus:outline-none"
          >
            クエストを強制終了する
          </button>
        )}
      </div>
      {startConfirmModalOpen && (
        <ConfirmModal
          text={"クエストを開始しますか?"}
          confirmBtnText={"開始する"}
          cancelBtnText={"キャンセル"}
          btnColor={"green"}
          actionFn={onClickStartQuest}
          closeModal={() => setStartConfirmModalOpen(false)}
        />
      )}
      {finishConfirmModalOpen && (
        <ConfirmModal
          text={"クエストを完了しますか?"}
          confirmBtnText={"完了する"}
          cancelBtnText={"キャンセル"}
          btnColor={"blue"}
          actionFn={onClickFinishQuest}
          closeModal={() => setFinishConfirmModalOpen(false)}
        />
      )}
    </div>
  );
};
