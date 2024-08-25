import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ExerciseChart = ({ target = 100, today = 0 }) => {
  const percentage = (today / target) * 100;

  const data = {
    labels: ["Today", "Remaining"],
    datasets: [
      {
        data: [today, target - today],
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
            return tooltipItem.label + ": " + ((tooltipItem.raw / target) * 100).toFixed(2) + "%";
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <Pie data={data} options={options} />
      <div className="absolute text-center">
        <p className="text-lg font-bold">{percentage.toFixed(1)}%</p>
        <p className="text-sm text-gray-600">of Target</p>
      </div>
    </div>
  );
}
