import React, { useEffect } from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Chart.js의 필요한 컴포넌트를 등록합니다.
ChartJS.register(PointElement, LinearScale, Title, Tooltip, Legend);

export const SequenceChart = ({ sequenceData }) => {
  useEffect(() => {
    // 플러그인 등록
    ChartJS.register({
      id: 'pointShadow',
      beforeDraw: (chart) => {
        const ctx = chart.ctx;
        chart.data.datasets.forEach((dataset) => {
          const meta = chart.getDatasetMeta(0);
          meta.data.forEach((point) => {
            const { x, y } = point.getProps(['x', 'y']);
            ctx.save();
            ctx.shadowColor = '#ff0000';
            ctx.shadowBlur = 1; // 블러 효과의 강도
            ctx.beginPath();
            ctx.arc(x, y, point.options.radius, 0, 2 * Math.PI);
            ctx.fillStyle = point.options.backgroundColor;
            ctx.fill();
            ctx.restore();
          });
        });
      },
    });
  }, []);

  // undefined 또는 유효하지 않은 값 필터링
  const validData = sequenceData
    .map((value, index) => ({
      x: index,
      y: value,
    }))
    .filter(point => point.y !== undefined && !isNaN(point.y));

  // x축의 최대/최소 값을 계산하여 좌우 여백을 줄입니다.
  const xMax = Math.max(...validData.map(point => point.x));
  const xMin = Math.min(...validData.map(point => point.x));

  const chartData = {
    datasets: [
      {
        label: 'Sequence Data',
        data: validData,
        backgroundColor: '#ff0000',
        pointRadius: 3.5, // 점의 크기를 조정합니다.
        pointHoverRadius: 8, // 마우스 오버 시 점의 크기를 더 키웁니다.
      },
    ],
  };

  const options = {
    responsive: true, // 반응형으로 만듭니다.
    maintainAspectRatio: false, // 부모 컨테이너의 크기에 따라 차트의 크기를 맞춥니다.
    scales: {
      x: {
        type: 'linear',
        position: 'bottom',
        min: xMin - (xMax - xMin) * 0.05, // 좌우에 여백을 추가합니다.
        max: xMax + (xMax - xMin) * 0.05,
        title: {
          display: true,
          text: '시간',
        },
        ticks: {
          display: false, // x축의 인덱스 숫자를 숨깁니다.
        },
        grid: {
          display: false, // x축의 그리드 라인을 숨깁니다.
        },
      },
      y: {
        min: 0, // y축의 최소값을 0으로 설정
        title: {
          display: true,
          text: '심박수',
        },
        grid: {
          display: false, // y축의 그리드 라인을 숨깁니다.
        },
      },
    },
    plugins: {
      legend: {
        display: false, // 범례를 숨깁니다.
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <Scatter data={chartData} options={options} />
    </div>
  );
};

export default SequenceChart;
