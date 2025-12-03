import { ArrowLeft, Settings } from "lucide-react";

export function ChartHeader({
  symbol,
  priceHistoryResponse,
  showCustomControls,
  setShowCustomControls,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-3 py-2 text-[#6B7280] dark:text-[#A0A0A0] hover:text-[#111827] dark:hover:text-[#E0E0E0] hover:bg-[#F9FAFB] dark:hover:bg-[#333333] rounded-lg transition-all duration-200"
        >
          <ArrowLeft size={20} />
          <span className="font-medium">Back to Browse</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowCustomControls(!showCustomControls)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#333333] border border-[#E5E7EB] dark:border-[#404040] text-[#374151] dark:text-[#E0E0E0] rounded-full text-sm font-medium hover:bg-[#F9FAFB] dark:hover:bg-[#404040] hover:border-[#9CA3AF] dark:hover:border-[#555555] active:bg-[#F3F4F6] dark:active:bg-[#555555] transition-all duration-200"
          >
            <Settings size={16} />
            {showCustomControls ? "Hide" : "Show"} Controls
          </button>
        </div>
      </div>

      <div className="text-center lg:text-left">
        <h1 className="text-2xl sm:text-[28px] font-semibold font-poppins text-[#111827] dark:text-[#E0E0E0] mb-1.5">
          {symbol.toUpperCase()} Chart Customizer
        </h1>
        <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0]">
          Create a beautiful, customizable chart perfect for social media
          sharing
        </p>
        {priceHistoryResponse?.data && (
          <p className="text-xs font-poppins text-[#9CA3AF] dark:text-[#6B7280] mt-1">
            Current price: $
            {parseFloat(
              priceHistoryResponse.data.currentPrice || 0,
            ).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
