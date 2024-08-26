import React from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend, LineElement);

export const SequenceChart = ({ sequenceData }) => {
  // Process the data to calculate the average time and organize data points
  const dataPoints = sequenceData.map((data) => {
    const averageTime = (data.startTime + data.endTime) / 2;
    return {
      x: averageTime,
      y: data.heartRate,
      anomaly: data.heartAnomaly,
    };
  });

  // Sort data points by time
  dataPoints.sort((a, b) => a.x - b.x);

  // If there are more than 25 data points, only take the last 25
  const slicedDataPoints = dataPoints.length > 20 ? dataPoints.slice(-20) : dataPoints;

  // Assign indices based on sorted order
  const indexedDataPoints = slicedDataPoints.map((point, index) => ({
    x: index, // Use index as the X value
    y: point.y,
    anomaly: point.anomaly,
  }));

  // Prepare the data for chart.js
  const chartData = {
    datasets: [{
        label: 'Heart Rate over Time',
        data: indexedDataPoints,
        borderColor: "rgba(0,0,0,0.1)",
        backgroundColor: indexedDataPoints.map((point) =>
          point.anomaly ? "red" : "#4CAF50"
        ),
        pointBorderColor: indexedDataPoints.map((point) =>
          point.anomaly ? "red" : "#4CAF50"
        ),
        pointBackgroundColor: indexedDataPoints.map((point) =>
          point.anomaly ? "red" : "#4CAF50"
        ),
        showLine: true,
        tension: 0.4, // Line tension (curvature)
        pointRadius: 2,
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
        text: "Sequence Data",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const anomaly = indexedDataPoints[context.dataIndex].anomaly
              ? "Anomaly detected"
              : "No anomaly";
            return `${context.raw.y} BPM (${anomaly})`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: '시간', // X축 레이블을 "Time"에서 "Index"로 변경
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
          text: '심박수 (BPM)',
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