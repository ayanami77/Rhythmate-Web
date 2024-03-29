export const ProfileExpCard = () => {
  return (
    <div className="my-4 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg shadow flex flex-col gap-1.5">
      <p className="font-bold">経験値</p>
      <div className="w-full bg-[#F5F5F5] rounded-full h-3">
        <div className="bg-[#28AC00] h-3 rounded-full w-1/2"></div>
      </div>
      <p className="text-end text-xs">あと16454Expでレベルアップ</p>
    </div>
  );
};
