import { useNavigate } from "@tanstack/react-router";

export const EntrancePresenter = () => {
  const navigation = useNavigate();

  return (
    <div className="py-16 flex flex-col items-center">
      <img className="w-56 my-4 inline object-center" src="/logo-long.svg" alt="rhythmateのロゴ" />
      <div>
        <div className="my-4 flex gap-2 items-center">
          <svg
            className="w-[80px] h-[80px] fill-rhyth-red"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8.6 3.2a1 1 0 0 0-1.6 1 3.5 3.5 0 0 1-.8 3.6c-.6.8-4 5.6-1 10.7A7.7 7.7 0 0 0 12 22a8 8 0 0 0 7-3.8 7.8 7.8 0 0 0 .6-6.5 8.7 8.7 0 0 0-2.6-4 1 1 0 0 0-1.6.7 10 10 0 0 1-.8 3.4 9.9 9.9 0 0 0-2.2-5.5A14.4 14.4 0 0 0 9 3.5l-.4-.3Z" />
          </svg>
          <p className="text-sm font-bold text-rhyth-dark-blue">
            Rhythmateで
            <br />
            ルーティンを
            <br />
            より楽しくしよう
          </p>
        </div>
        <div className="my-4 flex gap-2 items-center">
          <svg
            className="w-[80px] h-[80px] fill-rhyth-blue"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13.5 2a7 7 0 0 0-.5 0 1 1 0 0 0-1 1v8c0 .6.4 1 1 1h8c.5 0 1-.4 1-1v-.5A8.5 8.5 0 0 0 13.5 2Z" />
            <path d="M11 6a1 1 0 0 0-1-1 8.5 8.5 0 1 0 9 9 1 1 0 0 0-1-1h-7V6Z" />
          </svg>
          <p className="text-sm font-bold text-rhyth-dark-blue">
            習慣を可視化して
            <br />
            自分を振り返ろう
          </p>
        </div>
        <div className="my-4 flex gap-2 items-center">
          <svg
            className="w-[80px] h-[80px] fill-rhyth-yellow"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8 9c0-.6.4-1 1-1a1 1 0 0 1 0 2 1 1 0 0 1-1-1Zm6 0c0-.6.4-1 1-1a1 1 0 1 1 0 2 1 1 0 0 1-1-1Zm-5.5 7.2c-1-.8-1.7-2-1.9-3.2h10.8a5.5 5.5 0 0 1-9 3.2Z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-sm font-bold text-rhyth-dark-blue">
            良い習慣を身に付けて
            <br />
            アクティブな毎日を
          </p>
        </div>
      </div>
      <button
        onClick={() => navigation({ to: "/login" })}
        className="my-4  text-center text-white bg-rhyth-blue font-medium rounded-lg px-10 py-4 me-2 mb-2 shadow-lg"
      >
        今すぐ始める
      </button>
    </div>
  );
};
