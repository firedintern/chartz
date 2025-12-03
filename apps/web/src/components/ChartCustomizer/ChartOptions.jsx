export function ChartOptions({ showGrid, setShowGrid }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] p-4">
      <h4 className="text-sm font-semibold font-poppins text-[#111827] dark:text-[#E0E0E0] mb-3">
        Chart Options
      </h4>
      <div className="space-y-3">
        <label className="flex items-center justify-between">
          <span className="text-sm font-poppins text-[#374151] dark:text-[#A0A0A0]">
            Show Grid
          </span>
          <input
            type="checkbox"
            checked={showGrid}
            onChange={(e) => setShowGrid(e.target.checked)}
            className="w-4 h-4 text-[#FF8200] dark:text-[#FF8F1F] border-gray-300 dark:border-[#404040] rounded focus:ring-[#FF8200] dark:focus:ring-[#FF8F1F]"
          />
        </label>
      </div>
    </div>
  );
}
