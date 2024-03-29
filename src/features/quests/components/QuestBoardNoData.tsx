export const QuestBoardNoData = () => {
  return (
    <div className="w-full min-h-[230px] mt-3 p-3 border-2 shadow rounded-lg flex flex-col items-center bg-white">
      <p className="font-bold text-center p-4">
        今日のクエストは終了しました
        <br />
        お疲れさまでした!
      </p>
      <svg
        className="w-24 h-24 text-green-600"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M15 9.7h4a2 2 0 0 1 1.6.9 2 2 0 0 1 .3 1.8l-2.4 7.2c-.3.9-.5 1.4-1.9 1.4-2 0-4.2-.7-6.1-1.3L9 19.3V9.5A32 32 0 0 0 13.2 4c.1-.4.5-.7.9-.9h1.2c.4.1.7.4 1 .7l.2 1.3L15 9.7ZM4.2 10H7v8a2 2 0 1 1-4 0v-6.8c0-.7.5-1.2 1.2-1.2Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
};
