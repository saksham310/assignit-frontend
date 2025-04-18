
const PerformanceMetric = ({ label, value, maxValue, unit, description, color }) => {
    // Ensure value is between 0 and maxValue
    const normalizedValue = Math.max(0, Math.min(maxValue, value))
    const percentage = (normalizedValue / maxValue) * 100

    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <span className="text-sm font-semibold text-gray-900">
          {Math.round(normalizedValue)}
                    {unit}
        </span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                ></div>
            </div>
            <p className="text-xs text-gray-500">{description}</p>
        </div>
    )
}
export default PerformanceMetric