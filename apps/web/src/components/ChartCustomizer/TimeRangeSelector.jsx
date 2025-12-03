export function TimeRangeSelector({ timeRange, setTimeRange, currentColor }) {
  const ranges = ["24h", "7d", "30d", "1y"];

  return (
    <div className="flex gap-2">
      {ranges.map((range) => (
        <button
          key={range}
          onClick={() => setTimeRange(range)}
          className={`px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 ${
            timeRange === range
              ? "text-white"
              : currentColor.background === "#FFFFFF"
                ? "text-[#6B7280] hover:text-[#111827] hover:bg-[#F9FAFB] border border-[#E5E7EB]"
                : "text-[#A0A0A0] hover:text-[#E0E0E0] hover:bg-[#333333] border border-[#404040]"
          }`}
          style={timeRange === range ? { background: currentColor.stroke } : {}}
        >
          {range.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
