import React from 'react';

interface DonutChartProps {
  data: { name: string; value: number }[];
  title: string;
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const DonutChart: React.FC<DonutChartProps> = ({ data, title }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  if (total === 0) {
      return (
          <div className="flex flex-col items-center justify-center h-full">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">{title}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">No data available to display.</p>
          </div>
      );
  }
  
  let accumulatedPercentage = 0;

  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    const offset = accumulatedPercentage;
    accumulatedPercentage += percentage;

    return {
      ...item,
      percentage,
      offset,
      color: COLORS[index % COLORS.length],
    };
  });

  return (
    <div className="flex flex-col h-full">
      <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 text-center">{title}</h4>
      <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="relative w-48 h-48">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            <circle
              cx="18"
              cy="18"
              r="15.9155"
              fill="transparent"
              strokeWidth="3"
              className="text-gray-200 dark:text-gray-700"
              stroke="currentColor"
            />
            {segments.map((segment, index) => (
              <circle
                key={index}
                cx="18"
                cy="18"
                r="15.9155"
                fill="transparent"
                strokeWidth="3"
                strokeDasharray={`${segment.percentage} ${100 - segment.percentage}`}
                strokeDashoffset={-segment.offset}
                stroke={segment.color}
                className="transform -rotate-90 origin-center transition-all duration-500"
              >
                  <title>{`${segment.name}: ${segment.value.toLocaleString()} (${segment.percentage.toFixed(1)}%)`}</title>
              </circle>
            ))}
          </svg>
           <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-800 dark:text-gray-100">${total.toLocaleString()}</span>
            </div>
        </div>
        <ul className="space-y-2">
          {segments.map((segment, index) => (
            <li key={index} className="flex items-center text-sm">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{segment.name}:</span>
              <span className="ml-2 text-gray-500 dark:text-gray-400">${segment.value.toLocaleString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonutChart;