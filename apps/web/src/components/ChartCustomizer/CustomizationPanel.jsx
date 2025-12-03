import { ChartTypeSelector } from "./ChartTypeSelector";
import { ColorSchemeSelector } from "./ColorSchemeSelector";
import { ChartOptions } from "./ChartOptions";
import { ShareActions } from "./ShareActions";

export function CustomizationPanel({
  showCustomControls,
  chartType,
  setChartType,
  colorScheme,
  setColorScheme,
  theme,
  showGrid,
  setShowGrid,
  currentColor,
  onShareToGallery,
  onDownload,
  onShareTwitter,
  onShareInstagram,
  onCopyLink,
}) {
  return (
    <div
      className={`space-y-4 ${showCustomControls ? "block" : "hidden lg:block"}`}
    >
      <ChartTypeSelector
        chartType={chartType}
        setChartType={setChartType}
        currentColor={currentColor}
      />

      <ColorSchemeSelector
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
        theme={theme}
      />

      <ChartOptions showGrid={showGrid} setShowGrid={setShowGrid} />

      <ShareActions
        onShareToGallery={onShareToGallery}
        onDownload={onDownload}
        onShareTwitter={onShareTwitter}
        onShareInstagram={onShareInstagram}
        onCopyLink={onCopyLink}
      />
    </div>
  );
}
