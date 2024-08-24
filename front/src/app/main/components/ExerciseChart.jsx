import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateDummyExerciseData = () => {
  const target = Math.floor(Math.random() * 100 + 50); // 50 ~ 150 사이의 임의의 목표 운동량
  const today = Math.floor(Math.random() * target); // 목표 운동량보다 작은 오늘의 운동량
  return { target, today };
};

export const ExerciseChart = ({ target, today }) => {
  // 데이터가 없을 경우 임의의 데이터 생성
  const { target: generatedTarget, today: generatedToday } = target && today ? { target, today } : generateDummyExerciseData();

  const percentage = (generatedToday / generatedTarget) * 100;

  const data = {
    labels: ["Today", "Remaining"],
    datasets: [
      {
        data: [generatedToday, generatedTarget - generatedToday],
        backgroundColor: ["#4CAF50", "#EEEEEE"],
        hoverBackgroundColor: ["#66BB6A", "#BDBDBD"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return tooltipItem.label + ": " + tooltipItem.raw.toFixed(2) + "%";
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Pie data={data} options={options} />
      <div className="absolute text-center">
        <p className="text-lg font-bold">{percentage.toFixed(1)}%</p>
        <p className="text-sm text-gray-600">of Target</p>
      </div>
    </div>
  );
}
