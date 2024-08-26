import React from "react";
import { Scatter } from "react-chartjs-2";
import { Chart as ChartJS, PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement } from "chart.js";
import 'chartjs-adapter-moment';

ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend, TimeScale, LineElement);

export const AlertHeartChart = ({ bcgData }) => {  
  // 값이 없을 경우 임의로 100개짜리 데이터셋 생성
  if (!bcgData || bcgData.length === 0) {
    bcgData = Array.from({ length: 100 }, (_, index) => ({
      time: index,
      heart: Math.floor(Math.random() * (120 - 60 + 1)) + 60, // 60에서 120 사이의 임의의 심박수
    }));
  }

  const data = {
    datasets: [{
        label: 'Heart Rate',
        data: bcgData.map(entry => ({ x: entry.time, y: entry.heart })),
        showLine: true,
        backgroundColor: '#FF0000',  // 배경색을 빨간색으로 설정
        borderColor: '#FF0000',      // 경계선을 빨간색으로 설정
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
        beginAtZero: false,
        title: {
          display: true,
          text: 'Heart Rate',
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
        display: false,  // 레이블 숨기기
      },
    },
  };

  return (
    <div className="w-full h-full">
      <Scatter data={data} options={options} />
    </div>
  );
};
