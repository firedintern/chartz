import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { ChartGradients } from "./ChartGradients";
import { CustomTooltip } from "./CustomTooltip";
import { TimeRangeSelector } from "./TimeRangeSelector";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { EmptyState } from "./EmptyState";
import { CandlestickChart } from "./CandlestickChart";

export function ChartDisplay({
  symbol,
  chartType,
  chartData,
  currentColor,
  showGrid,
  timeRange,
  setTimeRange,
  isLoadingHistory,
  historyError,
}) {
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "24h":
        return "Last 24 Hours";
      case "7d":
        return "Last 7 Days";
      case "30d":
        return "Last 30 Days";
      case "1y":
        return "Last Year";
      default:
        return "Last 7 Days";
    }
  };

  const renderChart = () => {
    if (isLoadingHistory) {
      return <LoadingState symbol={symbol} />;
    }

    if (historyError) {
      return <ErrorState error={historyError} />;
    }

    // Use appropriate data based on chart type
    const data =
      chartType === "candlestick" ? chartData.ohlc : chartData.prices;

    if (!data || data.length === 0) {
      return <EmptyState symbol={symbol} />;
    }

    // Render candlestick chart
    if (chartType === "candlestick") {
      return (
        <CandlestickChart
          data={data}
          currentColor={currentColor}
          showGrid={showGrid}
        />
      );
    }

    // Render line or area chart
    const chartProps = {
      data: data,
      margin: { top: 20, right: 30, left: 20, bottom: 20 },
    };

    const axisProps = {
      tick: {
        fontSize: 12,
        fill: currentColor.background === "#FFFFFF" ? "#6B7280" : "#A0A0A0",
      },
      tickLine: {
        stroke: currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040",
      },
      axisLine: {
        stroke: currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040",
      },
    };

    return (
      <ResponsiveContainer width="100%" height={400}>
        {chartType === "area" ? (
          <AreaChart {...chartProps}>
            <ChartGradients />
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={
                  currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040"
                }
              />
            )}
            <XAxis dataKey="date" {...axisProps} />
            <YAxis
              {...axisProps}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} currentColor={currentColor} />
              )}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke={currentColor.stroke}
              strokeWidth={2}
              fill={currentColor.fill}
              dot={{
                fill: currentColor.stroke,
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: currentColor.stroke,
                strokeWidth: 2,
              }}
            />
          </AreaChart>
        ) : (
          <LineChart {...chartProps}>
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={
                  currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040"
                }
              />
            )}
            <XAxis dataKey="date" {...axisProps} />
            <YAxis
              {...axisProps}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip
              content={(props) => (
                <CustomTooltip {...props} currentColor={currentColor} />
              )}
            />
            <Line
              type="monotone"
              dataKey="price"
              stroke={currentColor.stroke}
              strokeWidth={3}
              dot={{
                fill: currentColor.stroke,
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                r: 6,
                stroke: currentColor.stroke,
                strokeWidth: 2,
              }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    );
  };

  return (
    <div
      className="rounded-lg shadow-sm border border-gray-200 dark:border-[#333333] overflow-hidden"
      style={{ backgroundColor: currentColor.background }}
    >
      {/* Chart Header */}
      <div
        className="p-4 sm:p-6 border-b border-gray-200 dark:border-[#333333]"
        style={{ backgroundColor: currentColor.background }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3
              className="text-lg font-semibold font-poppins"
              style={{
                color:
                  currentColor.background === "#FFFFFF" ? "#111827" : "#E0E0E0",
              }}
            >
              {symbol.toUpperCase()} Price Chart
            </h3>
            <p
              className="text-sm font-poppins"
              style={{
                color:
                  currentColor.background === "#FFFFFF" ? "#6B7280" : "#A0A0A0",
              }}
            >
              {getTimeRangeLabel()}
            </p>
          </div>

          <TimeRangeSelector
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            currentColor={currentColor}
          />
        </div>
      </div>

      {/* Chart Area */}
      <div
        className="p-4 sm:p-6"
        style={{
          backgroundColor: currentColor.background,
          minHeight: "400px",
        }}
      >
        {renderChart()}
      </div>
    </div>
  );
}
