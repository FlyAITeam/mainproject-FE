import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale } from "chart.js";
import 'chartjs-adapter-moment';

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend, TimeScale);

const generateDummyData = (numPoints) => {
  const dummyData = [];
  const now = new Date();
  for (let i = 0; i < numPoints; i++) {
    dummyData.push({
      time: new Date(now.getTime() - (numPoints - i) * 10), // 0.01초 간격
      heart: Math.random() * 40 + 60, // 60 ~ 100 bpm 범위의 랜덤 값
    });
  }
  return dummyData;
};

export default function HeartRateChart({ bcgData }) {
  const dataPoints = bcgData.length > 0 ? bcgData : generateDummyData(280);

  const data = {
    datasets: [
      {
        label: 'Heart Rate',
        data: dataPoints.map(entry => ({ x: entry.time, y: entry.heart })),
        showLine: false,
        backgroundColor: '#4CAF50',
        pointRadius: 2, // 점의 크기를 줄임
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'millisecond',
          displayFormats: {
            millisecond: 'h:mm:ss.SSS',
          },
        },
        ticks: {
          callback: function (value, index, ticks) {
            if (index === 0 || index === ticks.length - 1) {
              return this.getLabelForValue(value);
            }
            return '';
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        title: {
          display: true,
          text: 'Time (ms)',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Heart Rate',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `Heart Rate: ${tooltipItem.raw.y.toFixed(2)}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Scatter data={data} options={options} />
    </div>
  );
}
