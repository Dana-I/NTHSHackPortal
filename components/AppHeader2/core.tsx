export default function AppHeader2_Core() {
  return (
    <div className="flex justify-center py-2 w-full">
      {/* Real navbar */}
      <div className="font-dmSans flex items-center gap-4 border-[3px] border-[rgba(30,30,30,0.60)] rounded-xl px-20 bg-white">
        <div className="p-2 text-[#5D5A88] cursor-pointer">Home</div>
        <div className="p-2 text-[#5D5A88] cursor-pointer">Schedule</div>
        <div className="p-2 text-[#5D5A88] cursor-pointer">Resources</div>
        <div className="p-2 text-[#5D5A88] cursor-pointer">FAQ</div>

        <div className="p-2 text-white cursor-pointer">
          <div className="py-3 px-5 rounded-[30px] bg-[#5D5A88] font-bold">Apply</div>
        </div>
      </div>
    </div>
  );
}
