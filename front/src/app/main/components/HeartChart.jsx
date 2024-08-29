import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement } from "chart.js";
import 'chartjs-adapter-moment';

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement);

export const HeartChart = ({ bcgData }) => {
  try {
    const testData = bcgData.map(entry => ({ x: entry.time, y: entry.heart }));
  } catch (e) {
    bcgData = [{time: 1000, heartRate: 0}];
  }

  const data = {
    datasets: [{
        label: '심박값',
        data: bcgData.map(entry => ({ x: entry.time, y: entry.heart })),
        showLine: true,
        backgroundColor: '#4CD964',
        borderColor: '#4CD964',
        pointRadius: 0,  // 점을 표시하지 않도록 설정
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: '시간',
        },
        ticks: {
          display: false, // X축 값 숨기기
        },
        grid: {
          display: false, // X축 그리드 숨기기
        },
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: '',
        },
        ticks: {
          display: false, // Y축 값 숨기기
        },
        grid: {
          display: false, // Y축 그리드 숨기기
        },
      }
    },
    plugins: {
      tooltip: {
        enabled: false,  // 툴팁 비활성화
      },
      legend: {
        display: true,  // 레이블은 표시
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Scatter
        data={data}
        options={options}
        style={{ pointerEvents: "none" }} // 여기서 pointer-events 속성을 none으로 설정
      />
    </div>
  );
};
