import { useMutation } from "@tanstack/react-query";
import { CreateRequest, UpdateQuestParams } from "../types";
import { createFactory } from "../factory";
import { queryClient } from "../../../../pkg/api/client/queryClient";
import { Quest } from "../model";
import { notifyFailed, notifySuccess } from "../../../../pkg/ui/toast";
import { FetchError } from "../../../../pkg/api/util/fetchError";

export const useMutateQuest = () => {
  const createQuestMutation = useMutation({
    mutationFn: async (params: CreateRequest) => {
      return await createFactory().createQuest(params);
    },
    onSuccess: (data) => {
      const questList = queryClient.getQueryData<Quest[]>(["quests"]);
      if (questList) {
        queryClient.setQueryData<Quest[]>(["quests"], [data, ...questList]);
      }
      notifySuccess("クエストを作成しました。");
    },
    onError: (err: FetchError) => {
      notifyFailed("処理に失敗しました。");
      console.log(err);
    },
  });

  const updateQuestMutation = useMutation({
    mutationFn: async (params: UpdateQuestParams) => {
      return await createFactory().updateQuest(params);
    },
    onSuccess: (data) => {
      const questList = queryClient.getQueryData<Quest[]>(["quests"]);
      if (questList) {
        queryClient.setQueryData<Quest[]>(
          ["quests"],
          questList.map((quest) => (quest.id === data.id ? data : quest)),
        );
      }
      notifySuccess("クエストを終了しました。");
    },
    onError: (err: FetchError) => {
      notifyFailed("処理に失敗しました。");
      console.log(err);
    },
  });

  return {
    createQuestMutation,
    updateQuestMutation,
  };
};