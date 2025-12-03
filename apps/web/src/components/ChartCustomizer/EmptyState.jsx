import { AlertCircle } from "lucide-react";

export function EmptyState({ symbol }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
        <AlertCircle size={24} className="text-gray-400" />
      </div>
      <h3 className="text-lg font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] mb-2">
        No chart data available
      </h3>
      <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0] text-center">
        Unable to generate chart for {symbol.toUpperCase()}
      </p>
    </div>
  );
}
