import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorState({ error }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mb-4">
        <AlertCircle size={24} className="text-red-500 dark:text-red-400" />
      </div>
      <h3 className="text-lg font-medium font-poppins text-[#111827] dark:text-[#E0E0E0] mb-2">
        Failed to load chart data
      </h3>
      <p className="text-sm font-poppins text-[#6B7280] dark:text-[#A0A0A0] text-center mb-4">
        {error?.message || "Unable to fetch price data for this cryptocurrency"}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="flex items-center gap-2 px-4 py-2 bg-[#FF8200] text-white rounded-lg text-sm font-medium hover:bg-[#E56B00] transition-colors"
      >
        <RefreshCw size={16} />
        Retry
      </button>
    </div>
  );
}
