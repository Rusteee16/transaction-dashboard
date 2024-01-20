// components/BarChart.js

import { useEffect } from 'react';
import Chart, { Ticks } from 'chart.js/auto';
import { color } from 'chart.js/helpers';

type ApiDataItem = {
    _id: string;
    count: number;
}

const BarChart = ({ apiData}: any) => {
  useEffect(() => {

    const sortedApiData = apiData.sort((a: any, b: any) => {
        const rangeA = parseInt(a._id.split(' - ')[0]);
        const rangeB = parseInt(b._id.split(' - ')[0]);
        return rangeA - rangeB;
    });

    const labels = sortedApiData.map((item: ApiDataItem )=> item._id);
    const counts = sortedApiData.map((item: ApiDataItem ) => item.count);

    // Chart data
    const data = {
      labels: labels,
      datasets: [{
        label: 'Items Sold',
        data: counts,
        backgroundColor: 'rgba(253, 186, 116, 1)',
        borderColor: 'rgba(234, 88, 12, 1)',
        borderWidth: 1,
        font: {
            weight: 800
          }
      }]
    };

    // Chart options
    const options = {
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Count',
            color: 'rgba(234, 88, 12, 1)',
            font: {
                weight: 800
              }
          },
          ticks:{
            color: 'rgba(234, 88, 12, 1)',
            font: {
                weight: 800
              }
          },
          border:{
            color: 'rgba(234, 88, 12, 1)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Ranges',
            color: 'rgba(234, 88, 12, 1)',
            font: {
                weight: 800
              }
          },
          ticks:{
            color: 'rgba(234, 88, 12, 1)',
            font: {
                weight: 800
              }
          },
          border:{
            color: 'rgba(234, 88, 12, 1)'
          }
        }
        
      }
      
    };

    // Get the canvas element and create a bar chart
    const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    const myChart = new Chart(ctx!, {
      type: 'bar',
      data: data,
      options: options
    });

    // Cleanup the chart on component unmount
    return () => {
      myChart.destroy();
    };
  }, [apiData]);

  return (
    <div className=' h-96 self-center'>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default BarChart;
