export function CustomTooltip({ active, payload, label, currentColor }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#2D2D2D] p-3 rounded-lg shadow-lg border border-gray-200 dark:border-[#404040]">
        <p className="text-sm font-medium text-[#111827] dark:text-[#E0E0E0]">{`Date: ${label}`}</p>
        <p
          className="text-sm font-medium"
          style={{ color: currentColor.stroke }}
        >
          {`Price: $${payload[0].value.toLocaleString()}`}
        </p>
      </div>
    );
  }
  return null;
}
