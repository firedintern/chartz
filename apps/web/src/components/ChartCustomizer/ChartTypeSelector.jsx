export function ChartTypeSelector({ chartType, setChartType }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] p-4">
      <h4 className="text-sm font-semibold font-poppins text-[#111827] dark:text-[#E0E0E0] mb-3">
        Chart Type
      </h4>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={() => setChartType("line")}
          className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
            chartType === "line"
              ? "border-[#FF8200] dark:border-[#FF8F1F] bg-[#FFF7F0] dark:bg-[#2D2017] text-[#FF8200] dark:text-[#FF8F1F]"
              : "border-gray-200 dark:border-[#404040] text-[#6B7280] dark:text-[#A0A0A0] hover:border-[#9CA3AF] dark:hover:border-[#555555]"
          }`}
        >
          📈 Line
        </button>
        <button
          onClick={() => setChartType("area")}
          className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
            chartType === "area"
              ? "border-[#FF8200] dark:border-[#FF8F1F] bg-[#FFF7F0] dark:bg-[#2D2017] text-[#FF8200] dark:text-[#FF8F1F]"
              : "border-gray-200 dark:border-[#404040] text-[#6B7280] dark:text-[#A0A0A0] hover:border-[#9CA3AF] dark:hover:border-[#555555]"
          }`}
        >
          📊 Area
        </button>
        <button
          onClick={() => setChartType("candlestick")}
          className={`p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
            chartType === "candlestick"
              ? "border-[#FF8200] dark:border-[#FF8F1F] bg-[#FFF7F0] dark:bg-[#2D2017] text-[#FF8200] dark:text-[#FF8F1F]"
              : "border-gray-200 dark:border-[#404040] text-[#6B7280] dark:text-[#A0A0A0] hover:border-[#9CA3AF] dark:hover:border-[#555555]"
          }`}
        >
          🕯️ Candle
        </button>
      </div>
    </div>
  );
}
