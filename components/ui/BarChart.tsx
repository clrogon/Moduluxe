
import React from 'react';
import { MonthlyRevenue } from '../../shared/types/index';

interface BarChartProps {
  data: MonthlyRevenue[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.map(d => d.revenue), 0);
  const chartHeight = 300;
  const barWidth = 30;
  const barMargin = 15;
  const svgWidth = Math.max(data.length * (barWidth + barMargin), 100);

  const scale = (value: number) => {
      if (maxValue === 0) return 0;
      return (value / maxValue) * chartHeight;
  };

  return (
    <div className="w-full h-full flex justify-center items-end overflow-x-auto p-4">
        <svg width={svgWidth} height={chartHeight + 30} viewBox={`0 0 ${svgWidth} ${chartHeight + 30}`}>
            <g transform="translate(0, 0)">
                {data.map((d, i) => {
                    const barHeight = scale(d.revenue);
                    return (
                        <g key={d.month} transform={`translate(${i * (barWidth + barMargin)}, 0)`}>
                            <rect
                                y={chartHeight - barHeight}
                                width={barWidth}
                                height={barHeight}
                                fill="#4A90E2"
                                rx="2"
                            >
                                <title>{`${d.month}: $${d.revenue.toLocaleString()}`}</title>
                            </rect>
                            <text
                                x={barWidth / 2}
                                y={chartHeight + 20}
                                textAnchor="middle"
                                fontSize="12"
                                fill="#666"
                            >
                                {d.month}
                            </text>
                        </g>
                    );
                })}
                {/* Y-Axis line */}
                <line x1="0" y1="0" x2="0" y2={chartHeight} stroke="#ccc" />
                {/* X-Axis line */}
                <line x1="0" y1={chartHeight} x2={svgWidth} y2={chartHeight} stroke="#ccc" />
            </g>
        </svg>
    </div>
  );
};

export default BarChart;
