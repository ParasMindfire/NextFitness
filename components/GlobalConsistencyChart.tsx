import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const GlobalConsistencyChart: React.FC = () => {
  const data = {
    labels: ['Daily Workouts'],
    datasets: [
      {
        label: 'You',
        data: [90], // Example data: 90% consistency
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Global Average',
        data: [50], // Example data: 50% global average
        backgroundColor: '#FF6384',
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Consistency (%)',
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">Global Consistency</h3>
      <Bar data={data} options={options} />
      <p className="text-center mt-4">
        You are among the top <strong>90%</strong> of the world's population in maintaining daily workouts.
      </p>
    </div>
  );
};

export default GlobalConsistencyChart;
