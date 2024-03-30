import { useState } from "react";
import { useForm } from "react-hook-form";
import { NewStar } from "./NewStar";
import { NewDayOfTheWeek } from "./NewDayOfTheWeek";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormErrorMsg } from "../../../common/components/utils/FormErrorMsg";
import { useMutateQuest } from "../../api/quest/hooks/useMutateQuest";
import { useNavigate } from "@tanstack/react-router";
import { TManageValidationSchema, manageValidationSchema } from "../../common/libs/validation";
import { DAYS } from "../../common/constant/constant";
import { convertEnToJPWeekday } from "../../common/funcs";
import { Day, Difficulty } from "../../../../api/quest/types";
import { formatDateTimeOnlyDate, formatDateTimeWithAddMinutes, isBefore, now } from "../../../../pkg/util/dayjs";

type NewValues = {
  title: string;
  startsAt: string;
  minutes: string;
  days: string[];
  description: string;
};

export const getCurrentQuestState = (now: string, startsAt: string) => {
  const targetDateTime = formatDateTimeWithAddMinutes(`${formatDateTimeOnlyDate(now)} ${startsAt}`, 15);
  return isBefore(targetDateTime) ? "INACTIVE" : "ACTIVE";
};

export const NewPresenter = () => {
  const navigate = useNavigate();
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY");
  const { createQuestMutation } = useMutateQuest();

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TManageValidationSchema>({
    mode: "onBlur",
    resolver: zodResolver(manageValidationSchema),
    defaultValues: {
      days: [],
    },
  });
  const onSubmit = async (data: NewValues) => {
    await createQuestMutation.mutateAsync({
      title: data.title,
      description: data.description,
      startsAt: data.startsAt,
      tagId: "",
      minutes: Number(data.minutes),
      days: data.days as Day[],
      difficulty: difficulty,
      state: getCurrentQuestState(now(), data.startsAt),
    });

    // リセット処理
    reset();
    setValue("days", []);
    setDifficulty("EASY");
    navigate({ to: "/manage" });
  };
  return (
    <>
      <button onClick={() => navigate({ to: "/manage" })} className="block">
        <div className="px-2 py-2 flex gap-2 items-center bg-white font-bold text-sm rounded-md border-2 border-rhyth-light-gray shadow-sm">
          <svg
            className="w-6 h-6 text-rhyth-gray"
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
              d="M5 12h14M5 12l4-4m-4 4 4 4"
            />
          </svg>
          <p className="text-rhyth-gray">ひとつ前へ戻る</p>
        </div>
      </button>
      <h1 className="text-xl font-cp-font text-rhyth-gray mt-4 mb-2">クエスト作成</h1>
      <form className="bg-white px-3 py-2 rounded-lg shadow-lg" onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-2 flex flex-col gap-2">
          <label htmlFor="new-quest-title" className="text-base font-bold text-rhyth-gray">
            タイトル
          </label>
          <input
            type="text"
            id="new-quest-title"
            placeholder="タイトルを入力"
            className="w-full p-2 border-2 border-rhyth-light-gray rounded-lg"
            {...register("title")}
          />
        </div>
        {errors.title && <FormErrorMsg msg={errors.title.message ?? ""} />}
        <div className="grid grid-cols-8 mt-4">
          <div className="my-4">
            <svg
              className="w-6 h-6 text-rhyth-gray mt-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm11-4a1 1 0 1 0-2 0v4c0 .3.1.5.3.7l3 3a1 1 0 0 0 1.4-1.4L13 11.6V8Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="my-2 col-span-7">
            <div className="grid grid-cols-5 my-2 items-center">
              <p className="col-span-2 font-bold text-rhyth-gray">実施時刻</p>
              <div className="col-span-3 flex justify-end items-center">
                <input type="time" className="w-[85px] border-2 rounded p-1 mr-2 shadow-sm" {...register("startsAt")} />
                <span className="font-bold text-rhyth-gray">から</span>
              </div>
            </div>
            {errors.startsAt && <FormErrorMsg msg={errors.startsAt.message ?? ""} />}
            <div className="grid grid-cols-5 my-2 items-center">
              <p className="col-span-2 font-bold text-rhyth-gray">取り組み時間</p>
              <div className="col-span-3 flex justify-end items-center">
                <input
                  type="number"
                  className="w-[85px] border-2 rounded p-1 mr-2 shadow-sm"
                  min={1}
                  {...register("minutes")}
                />
                <p className="font-bold text-rhyth-gray">分間</p>
              </div>
            </div>
            {errors.minutes && <FormErrorMsg msg={errors.minutes.message ?? ""} />}
            <div className="my-2">
              <p className="block my-2 font-bold text-rhyth-gray">実施頻度</p>
              <div className="flex mt-4 gap-1">
                {DAYS.map((day, i) => {
                  return (
                    <NewDayOfTheWeek
                      key={i}
                      day={convertEnToJPWeekday(day)}
                      value={day}
                      register={register}
                      watch={watch}
                    />
                  );
                })}
              </div>
              {errors.days && <FormErrorMsg msg={errors.days.message ?? ""} />}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <svg
              className="w-6 h-6 text-rhyth-gray"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M4 6a2 2 0 0 0-2 2v8c0 1.1.9 2 2 2h11.6c.5 0 1-.2 1.4-.5l4.4-4a2 2 0 0 0 0-3l-4.4-4a2 2 0 0 0-1.4-.5H4Z" />
            </svg>
            <p className="font-bold text-rhyth-gray">難易度</p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              className={`w-1/4 border-2 flex justify-center items-center gap-1 p-2 rounded-md shadow-sm ${
                difficulty === "EASY" ? "bg-rhyth-blue" : "bg-white"
              }`}
              onClick={() => {
                setDifficulty("EASY");
              }}
            >
              <NewStar />
            </button>
            <button
              type="button"
              className={`w-1/4 border-2 flex justify-center items-center gap-1 p-2 rounded-md shadow-sm ${
                difficulty === "NORMAL" ? "bg-rhyth-blue" : "bg-white"
              }`}
              onClick={() => {
                setDifficulty("NORMAL");
              }}
            >
              <NewStar />
              <NewStar />
            </button>
            <button
              type="button"
              className={`w-1/4 border-2 flex justify-center items-center gap-1 p-2 rounded-md shadow-sm ${
                difficulty === "HARD" ? "bg-rhyth-blue" : "bg-white"
              }`}
              onClick={() => {
                setDifficulty("HARD");
              }}
            >
              <NewStar />
              <NewStar />
              <NewStar />
            </button>
          </div>
        </div>
        <div className="w-full flex justify-between items-center gap-2 mt-6">
          <div className="flex items-center gap-2 w-24">
            <svg
              className="w-6 h-6 text-rhyth-gray"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="M5 7h14M5 12h14M5 17h10" />
            </svg>
            <label htmlFor="new-quest-description" className="my-2 text-base font-bold text-rhyth-gray">
              説明
            </label>
          </div>
          <input
            type="text"
            id="new-quest-description"
            className="w-full border-2 p-2 rounded-md"
            {...register("description")}
          />
        </div>
        {errors.description && <FormErrorMsg msg={errors.description.message ?? ""} />}
        <button
          type="submit"
          className="w-full mt-8 text-white bg-rhyth-blue focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base my-4 p-3 shadow-lg focus:outline-none"
        >
          クエストを作成する
        </button>
      </form>
    </>
  );
};
