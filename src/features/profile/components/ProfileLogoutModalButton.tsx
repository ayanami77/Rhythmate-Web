import type { FC } from "react";

type Props = {
  onClickFn: () => void;
};

export const ProfileLogoutModalButton: FC<Props> = ({ onClickFn }) => {
  return (
    <div className="w-full text-sm font-medium text-rhyth-black bg-white hover:bg-rhyth-hover-light-gray border border-gray-200 rounded-b-lg shadow">
      <button type="button" onClick={onClickFn} className="block w-full h-hull">
        <div className="px-4 py-3 flex gap-6 items-center">
          <div>
            <svg
              className="w-[32px] h-[32px] text-rhyth-red"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
              />
            </svg>
          </div>
          <p className="text-lg text-red-600 font-bold">ログアウト</p>
        </div>
      </button>
    </div>
  );
};
