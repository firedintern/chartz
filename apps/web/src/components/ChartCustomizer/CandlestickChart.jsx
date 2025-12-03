import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
  Cell,
} from "recharts";

function CandlestickTooltip({ active, payload, currentColor }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    const isGreen = data.close >= data.open;

    return (
      <div className="bg-white dark:bg-[#2D2D2D] p-3 rounded-lg shadow-lg border border-gray-200 dark:border-[#404040]">
        <p className="text-sm font-medium text-[#111827] dark:text-[#E0E0E0] mb-2">
          {data.date}
        </p>
        <div className="space-y-1 text-xs">
          <p className={isGreen ? "text-green-600" : "text-red-600"}>
            <span className="font-medium">Open:</span> $
            {data.open?.toLocaleString()}
          </p>
          <p className={isGreen ? "text-green-600" : "text-red-600"}>
            <span className="font-medium">High:</span> $
            {data.high?.toLocaleString()}
          </p>
          <p className={isGreen ? "text-green-600" : "text-red-600"}>
            <span className="font-medium">Low:</span> $
            {data.low?.toLocaleString()}
          </p>
          <p
            className={
              isGreen
                ? "text-green-600 font-semibold"
                : "text-red-600 font-semibold"
            }
          >
            <span className="font-medium">Close:</span> $
            {data.close?.toLocaleString()}
          </p>
        </div>
      </div>
    );
  }
  return null;
}

function Candlestick({ x, y, width, height, payload, currentColor }) {
  const { open, high, low, close } = payload;

  if (!open || !high || !low || !close) return null;

  const isGreen = close >= open;
  const color = isGreen ? "#10B981" : "#EF4444";

  const candleHeight = Math.abs(close - open);
  const candleY = Math.min(open, close);
  const wickY = high;
  const wickHeight = high - low;

  // Scale factors
  const scale = height / (high - low || 1);
  const adjustedCandleY = (high - candleY) * scale;
  const adjustedCandleHeight = candleHeight * scale || 2;
  const adjustedWickHeight = wickHeight * scale;

  return (
    <g>
      {/* Wick */}
      <line
        x={x + width / 2}
        y={y}
        x2={x + width / 2}
        y2={y + adjustedWickHeight}
        stroke={color}
        strokeWidth={1}
      />
      {/* Body */}
      <rect
        x={x + width * 0.2}
        y={y + adjustedCandleY}
        width={width * 0.6}
        height={Math.max(adjustedCandleHeight, 2)}
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </g>
  );
}

export function CandlestickChart({ data, currentColor, showGrid }) {
  // Transform data for candlestick display
  const chartData = data.map((item) => ({
    ...item,
    range: [item.low, item.high],
    body: [Math.min(item.open, item.close), Math.max(item.open, item.close)],
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={
              currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040"
            }
          />
        )}
        <XAxis
          dataKey="date"
          tick={{
            fontSize: 12,
            fill: currentColor.background === "#FFFFFF" ? "#6B7280" : "#A0A0A0",
          }}
          tickLine={{
            stroke:
              currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040",
          }}
          axisLine={{
            stroke:
              currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040",
          }}
        />
        <YAxis
          domain={["dataMin", "dataMax"]}
          tick={{
            fontSize: 12,
            fill: currentColor.background === "#FFFFFF" ? "#6B7280" : "#A0A0A0",
          }}
          tickLine={{
            stroke:
              currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040",
          }}
          axisLine={{
            stroke:
              currentColor.background === "#FFFFFF" ? "#E5E7EB" : "#404040",
          }}
          tickFormatter={(value) => `$${value.toLocaleString()}`}
        />
        <Tooltip
          content={(props) => (
            <CandlestickTooltip {...props} currentColor={currentColor} />
          )}
        />
        <Bar
          dataKey="high"
          shape={(props) => (
            <Candlestick {...props} currentColor={currentColor} />
          )}
          isAnimationActive={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
