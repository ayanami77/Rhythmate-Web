export type ListResponse = {
  status: string;
  weeklyReports: {
    id: string;
    completed_quests: number;
    failed_quests: number;
    completed_percentage: number;
    completed_days: number;
    completed_quests_each_day: number[];
    start_date: string;
    end_date: string;
    user_id: string;
  }[];
};
export type GetSummaryParams = {
  weeklyReportIndex: number;
};
export type GetSummaryRequest = {
  weeklyReportIndex: number;
};
export type GetSummaryResponse = {
  status: string;
  summary: string;
};
