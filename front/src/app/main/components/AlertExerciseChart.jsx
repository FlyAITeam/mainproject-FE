import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const AlertExerciseChart = ({ target = 100, today = 0 }) => {
  const percentage = (today / target) * 100;

  const data = {
    labels: ["Today", "Remaining"],
    datasets: [
      {
        data: [today, target - today],
        backgroundColor: ["#FF0000", "#EEEEEE"],  // 빨간색으로 설정
        hoverBackgroundColor: ["#FF6666", "#BDBDBD"],  // 호버 시 연한 빨간색
        borderWidth: 0,  // 경계선 제거
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",  // 도넛형으로 가운데 공간 확보
    plugins: {
      tooltip: { enabled: false },  // 툴팁 비활성화
      legend: { display: false },  // 범례 비활성화
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Pie data={data} options={options} />
      <div className="absolute text-center">
        <p className="text-xl font-bold text-red-600">{percentage.toFixed(1)}%</p>  {/* 퍼센트 텍스트를 크게 설정 */}
      </div>
    </div>
  );
}
