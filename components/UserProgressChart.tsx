import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const UserProgressChart: React.FC = () => {
  const data = {
    labels: ['Ahead of', 'Behind'],
    datasets: [
      {
        data: [70, 30], // Example data: 70% ahead, 30% behind
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = data.labels[tooltipItem.dataIndex] || '';
            return `${label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-center mb-4">Your Progress</h3>
      <Doughnut data={data} options={options} />
      <p className="text-center mt-4">
        You are ahead of <strong>70%</strong> of users on this website.
      </p>
    </div>
  );
};

export default UserProgressChart;
