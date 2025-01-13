/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions type

const Chart: React.FC = () => {
  const colors = ['#1E90FF', '#FF6347', '#32CD32', '#FFD700', '#FF69B4', '#4B0082', '#FFA500', '#7B68EE'];

  const [state, setState] = useState<{
    series: { data: number[] }[];
    options: ApexOptions;
  }>({
    series: [
      {
        data: [21, 22, 10, 28, 16, 21, 13, 30],
      },
    ],
    options: {
      chart: {
        type: 'bar',
        events: {
          click: (chart, w, e) => {
            console.log(chart, w, e);
          },
        },
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: [
          ['John', 'Doe'],
          ['Joe', 'Smith'],
          ['Jake', 'Williams'],
          'Amber',
          ['Peter', 'Brown'],
          ['Mary', 'Evans'],
          ['David', 'Wilson'],
          ['Lily', 'Roberts'],
        ],
        labels: {
          style: {
            colors: colors,
            fontSize: '12px',
          },
        },
      },
    },
  });

  return (
    <div id="chart" style={{ height: '50vh', width: '100%', position: 'relative' }}>
      <ReactApexChart options={state.options} series={state.series} type="bar" height="100%" />
    </div>
  );
};

export default Chart;
