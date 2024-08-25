import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
} from "chart.js";
import 'chartjs-adapter-moment';

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement);

export const SequenceChart = ({ sequenceData }) => {
  // Process the data to calculate the average time and organize data points
  const dataPoints = sequenceData.map((data) => {
    const averageTime = (data.startTime + data.endTime) / 2;
    return {
      x: averageTime * 1000, // Convert to milliseconds for chart.js
      y: data.heartRate,
      anomaly: data.heartAnomaly,
    };
  });

  // Sort data points by time
  dataPoints.sort((a, b) => a.x - b.x);

  // Prepare the data for chart.js
  const chartData = {
    datasets: [
      {
        label: 'Heart Rate over Time',
        data: dataPoints,
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: dataPoints.map((point) =>
          point.anomaly ? "red" : "blue"
        ),
        pointBorderColor: dataPoints.map((point) =>
          point.anomaly ? "red" : "blue"
        ),
        pointBackgroundColor: dataPoints.map((point) =>
          point.anomaly ? "red" : "blue"
        ),
        showLine: true,
        tension: 0.4, // Line tension (curvature)
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // This allows the chart to fill the container
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "Heart Rate Sequence",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const anomaly = dataPoints[context.dataIndex].anomaly
              ? "Anomaly detected"
              : "No anomaly";
            return `Heart Rate: ${context.raw.y} BPM (${anomaly})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'second',
          tooltipFormat: 'll HH:mm:ss',
          displayFormats: {
            second: 'HH:mm:ss',
          },
        },
        title: {
          display: true,
          text: 'Time',
        },
        ticks: {
          display: false, // X축 값 숨기기
        },
        grid: {
          display: false, // X축 그리드 숨기기
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Heart Rate (BPM)',
        },
        ticks: {
          display: false, // Y축 값 숨기기
        },
        grid: {
          display: false, // Y축 그리드 숨기기
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
};
