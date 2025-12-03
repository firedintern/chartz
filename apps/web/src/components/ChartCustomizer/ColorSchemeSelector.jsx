import { colorSchemes } from "./colorSchemes";

export function ColorSchemeSelector({ colorScheme, setColorScheme, theme }) {
  return (
    <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] p-4">
      <h4 className="text-sm font-semibold font-poppins text-[#111827] dark:text-[#E0E0E0] mb-3">
        Color Themes
      </h4>
      <div className="space-y-2">
        {Object.entries(colorSchemes).map(([key, scheme]) => (
          <button
            key={key}
            onClick={() => setColorScheme(key)}
            className={`w-full flex items-center justify-between p-3 rounded-lg border text-sm font-medium transition-all duration-200 ${
              colorScheme === key
                ? "border-[#FF8200] dark:border-[#FF8F1F] bg-[#FFF7F0] dark:bg-[#2D2017]"
                : "border-gray-200 dark:border-[#404040] hover:border-[#9CA3AF] dark:hover:border-[#555555]"
            }`}
          >
            <span className="text-[#111827] dark:text-[#E0E0E0] capitalize">
              {key}
            </span>
            <div
              className="w-6 h-6 rounded-full border-2 border-white"
              style={{ backgroundColor: scheme.stroke }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
