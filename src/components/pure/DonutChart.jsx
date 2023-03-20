import React, { useRef, useEffect } from 'react';
import {Chart} from 'chart.js';

export const DonutChart = () => {
  const chartRef = useRef();

  useEffect(() => {
    const myChartRef = chartRef.current.getContext("2d");

    new Chart(myChartRef, {
      type: 'doughnut',
      data: {
        labels: ['Tareas completadas', 'Tareas pendientes'],
        datasets: [{
          data: [4, 6], // aquí deberías reemplazar con los datos reales de tu aplicación
          backgroundColor: ['#36A2EB', '#FF6384']
        }]
      },
      options: {
        cutoutPercentage: 50,
        legend: {
          position: 'bottom'
        }
      }
    });
  }, []);

  return (
    <canvas ref={chartRef} />
  );
};