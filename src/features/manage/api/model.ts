import { formatDate, now } from "../../../pkg/util/dayjs";
import { QuestState } from "./types";

export type Quest = {
  id: string;
  title: string;
  description: string;
  startsAt: string;
  startedAt: string;
  minutes: number;
  // TODO
  tag_id: string;
  difficulty: string;
  state: QuestState;
  isSucceeded: boolean;
  startDate: Date;
  endDate: Date;
  dates: string[];
  weeklyFrequency: number;
  weeklyCompletionCount: number;
};

export const toQuest = (obj: {
  id: string;
  title: string;
  description: string;
  starts_at: string;
  started_at: string;
  minutes: number;
  tag_id: string;
  difficulty: string;
  state: QuestState;
  is_succeeded: boolean;
  start_date: Date;
  end_date: Date;
  dates: string[];
  weekly_frequency: number;
  weekly_completion_count?: number;
}): Quest => {
  return {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    startsAt: `${formatDate(now())} ${obj.starts_at}`,
    startedAt: obj.started_at,
    minutes: obj.minutes,
    tag_id: obj.tag_id,
    difficulty: obj.difficulty,
    state: obj.state,
    isSucceeded: obj.is_succeeded,
    startDate: obj.start_date,
    endDate: obj.end_date,
    dates: obj.dates,
    weeklyFrequency: obj.weekly_frequency,
    weeklyCompletionCount: obj.weekly_completion_count ?? 0,
  };
};

// export type Tag = {
//   id: string
//   name: string
// }

// export const toTag = (obj: { id: string, name: string }): Tag => {
//   return {
//     id: obj.id,
//     name: obj.name
//   }
// }