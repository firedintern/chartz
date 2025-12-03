import { useState } from "react";
import { usePriceHistory } from "../hooks/usePriceHistory";
import { useChartData } from "../hooks/useChartData";
import { useSaveChart } from "../hooks/useSaveChart";
import { useShareToGallery } from "../hooks/useShareToGallery";
import { getColorScheme } from "./ChartCustomizer/colorSchemes";
import { ChartHeader } from "./ChartCustomizer/ChartHeader";
import { ChartDisplay } from "./ChartCustomizer/ChartDisplay";
import { CustomizationPanel } from "./ChartCustomizer/CustomizationPanel";
import { GalleryModal } from "./ChartCustomizer/GalleryModal";

export default function ChartCustomizer({ symbol = "BTC" }) {
  const [chartType, setChartType] = useState("line");
  const [colorScheme, setColorScheme] = useState("gradient1");
  const [showGrid, setShowGrid] = useState(true);
  const [timeRange, setTimeRange] = useState("7d");
  const [theme, setTheme] = useState("light");
  const [showCustomControls, setShowCustomControls] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: "",
    description: "",
    creatorName: "",
    creatorHandle: "",
  });
  const [shareError, setShareError] = useState(null);
  const [shareSuccess, setShareSuccess] = useState(false);

  // Fetch price history data using react-query
  const {
    data: priceHistoryResponse,
    isLoading: isLoadingHistory,
    error: historyError,
  } = usePriceHistory(symbol, timeRange);

  // Save chart configuration
  const saveChartMutation = useSaveChart();

  // Share to gallery mutation
  const shareToGalleryMutation = useShareToGallery({
    onSuccess: () => {
      setShareSuccess(true);
      setTimeout(() => {
        setShowGalleryModal(false);
        setShareSuccess(false);
        setGalleryForm({
          title: "",
          description: "",
          creatorName: "",
          creatorHandle: "",
        });
      }, 2000);
    },
    onError: (error) => {
      setShareError(error.message);
    },
  });

  // Extract and format chart data
  const chartData = useChartData(priceHistoryResponse, timeRange);

  // Add debugging information
  console.log("ChartCustomizer render:", {
    symbol,
    isLoadingHistory,
    historyError,
    dataAvailable: !!priceHistoryResponse?.data,
    pricesLength: chartData.prices?.length || 0,
    ohlcLength: chartData.ohlc?.length || 0,
    response: priceHistoryResponse,
  });

  const currentColor = getColorScheme(colorScheme, theme);

  const handleShare = (platform) => {
    console.log(`Sharing to ${platform}`);
  };

  const handleDownload = () => {
    console.log("Downloading chart...");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleShareToGallery = async () => {
    setShareError(null);

    try {
      const chartConfig = {
        cryptoSymbol: symbol,
        chartType,
        colorScheme,
        showGrid,
        timeRange,
        backgroundTheme: theme,
        chartTitle: galleryForm.title,
      };

      const saveResult = await saveChartMutation.mutateAsync(chartConfig);

      await shareToGalleryMutation.mutateAsync({
        userChartId: saveResult.data.chartId,
        title: galleryForm.title,
        description: galleryForm.description,
        creatorName: galleryForm.creatorName,
        creatorHandle: galleryForm.creatorHandle,
      });
    } catch (error) {
      console.error("Error sharing to gallery:", error);
      setShareError(error.message);
    }
  };

  return (
    <div>
      <ChartHeader
        symbol={symbol}
        priceHistoryResponse={priceHistoryResponse}
        showCustomControls={showCustomControls}
        setShowCustomControls={setShowCustomControls}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Chart Display Area */}
        <div className="lg:col-span-3">
          <ChartDisplay
            symbol={symbol}
            chartType={chartType}
            chartData={chartData}
            currentColor={currentColor}
            showGrid={showGrid}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            isLoadingHistory={isLoadingHistory}
            historyError={historyError}
          />
        </div>

        {/* Customization Panel */}
        <CustomizationPanel
          showCustomControls={showCustomControls}
          chartType={chartType}
          setChartType={setChartType}
          colorScheme={colorScheme}
          setColorScheme={setColorScheme}
          theme={theme}
          showGrid={showGrid}
          setShowGrid={setShowGrid}
          onShareToGallery={() => setShowGalleryModal(true)}
          onDownload={handleDownload}
          onShareTwitter={() => handleShare("twitter")}
          onShareInstagram={() => handleShare("instagram")}
          onCopyLink={handleCopyLink}
        />
      </div>

      {/* Gallery Share Modal */}
      <GalleryModal
        showGalleryModal={showGalleryModal}
        setShowGalleryModal={setShowGalleryModal}
        galleryForm={galleryForm}
        setGalleryForm={setGalleryForm}
        shareError={shareError}
        shareSuccess={shareSuccess}
        onSubmit={handleShareToGallery}
        isSubmitting={shareToGalleryMutation.isPending}
        symbol={symbol}
      />

      {/* Poppins Font */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&family=Inter:wght@400;500;600&display=swap');
        .font-poppins {
          font-family: 'Poppins', 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
}
