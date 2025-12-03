export function LoadingState({ symbol }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#FF8200] dark:border-[#FF8F1F] border-t-transparent mb-4"></div>
      <h3 className="text-lg font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] mb-2">
        Loading {symbol.toUpperCase()} chart data...
      </h3>
      <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0] text-center">
        Please wait while we fetch the latest price data
      </p>
    </div>
  );
}
