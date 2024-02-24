import { formatDateWithAddMinutes, formatDateWithSubtract } from "../../../pkg/util/dayjs";
import { QuestStatus } from "../components/QuestBoard";

export const getBaseTime = (
  startsAt: string,
  isStarted: boolean,
  minutes: number,
  startedAt: string,
): { baseTime: string; status: QuestStatus } => {
  const { diffMM: beforeDiffMM } = getDiff(formatDateWithSubtract(startsAt, 15));

  // クエスト解放前
  if (!isStarted && 0 <= beforeDiffMM) {
    return {
      baseTime: formatDateWithSubtract(startsAt, 15),
      status: "CLOSED",
    };
  }

  // クエスト開始が押せなかった場合
  if (!isStarted && beforeDiffMM <= -31) {
    return {
      baseTime: "",
      status: "FORCE_STOP",
    };
  }

  // クエスト解放中前後30分
  if (!isStarted && beforeDiffMM < 0) {
    return {
      baseTime: formatDateWithAddMinutes(startsAt, 15),
      status: "OPENED",
    };
  }

  const { diffMM: afterDiffMM } = getDiff(formatDateWithAddMinutes(startedAt, minutes));

  // クエスト開始・集中
  if (isStarted && 0 <= afterDiffMM) {
    return {
      baseTime: formatDateWithAddMinutes(startedAt, minutes),
      status: "ENGAGED",
    };
  }

  // クエスト終了が押せなかった場合
  if (isStarted && afterDiffMM <= -16) {
    return {
      baseTime: "",
      status: "FORCE_STOP",
    };
  }

  // クエスト終了後
  return {
    baseTime: formatDateWithAddMinutes(startedAt, minutes + 15),
    status: "DONE",
  };
};

export const getDiff = (target: string) => {
  const timeDifference = new Date(target).getTime() - Date.now();
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
  const seconds = Math.floor((timeDifference / 1000) % 60);

  return {
    diffHH: hours,
    diffMM: minutes,
    diffSS: seconds,
  };
};
