import { useMutation } from "@tanstack/react-query";
import { createFactory } from "../../../../../api/weeklyReport/factory";
import type { WeeklyReport } from "../../../../../api/weeklyReport/model";
import { queryClient } from "../../../../../pkg/api/client/queryClient";
import type { FetchError } from "../../../../../pkg/api/util/fetchError";
import { notifyWithToast } from "../../../../../pkg/ui/toast";

export const useMutateWeeklyReport = () => {
  const weeklyReportFactory = createFactory();

  const generateFeedBackMutation = useMutation({
    mutationFn: async (params: { weeklyReportId: string }) => {
      const feedBack = await weeklyReportFactory.generateWeeklyReportFeedBack(params);
      const weeklyReportId = params.weeklyReportId;
      return { feedBack, weeklyReportId };
    },
    onSuccess: (data) => {
      const weeklyReports = queryClient.getQueryData<WeeklyReport[]>(["weeklyReports"]);
      if (weeklyReports) {
        queryClient.setQueryData<WeeklyReport[]>(
          ["weeklyReports"],
          weeklyReports.map((weeklyReport) =>
            weeklyReport.id === data.weeklyReportId
              ? {
                  ...weeklyReport,
                  feedback: data.feedBack,
                }
              : weeklyReport,
          ),
        );
      }
      notifyWithToast({ status: "success", msg: "フィードバックを生成しました。" });
    },
    onError: (err: FetchError) => {
      notifyWithToast({ status: "error", msg: "処理に失敗しました。" });
      console.log(err);
    },
  });

  return {
    generateFeedBackMutation,
  };
};
