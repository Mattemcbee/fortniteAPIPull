import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './style.css'; // Ensure you import your CSS file
import { Row, Col, Container, Button } from 'reactstrap'; // Importing Row and Col components from Reactstrap

function PlayerWinChart({ wins }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const data = {
      labels: wins.map(player => player.name),
      datasets: [{
        label: 'Wins per Player',
        data: wins.map(player => player.wins),
        backgroundColor: [
          "#FF6961", "#FFA07A", "#FFD700",
          "#77DD77", "#ADD8E6", "#B39EB5",
          "#FFB6C1", "#C9C0BB"
        ],
        borderColor: [
          "#FF6961", "#FFA07A", "#FFD700",
          "#77DD77", "#ADD8E6", "#B39EB5",
          "#FFB6C1", "#C9C0BB"
        ],
        borderWidth: 1
      }]
    };

    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: true
          }
        },
        title: {
          display: true,
          text: 'Wins by Player',
          font: {
            size: 18,
            weight: 'bold',
            color: 'white'
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white'
            }
          },
          y: {
            ticks: {
              color: 'white',
              precision: 0
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.2)'
            }
          }
        }
      }
    });

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [wins]);

  return (
    <>
      <h2 className='headerTextColorComparison text-center'>Wins This Season</h2>
      <Container fluid className="chart-container" style={{ height: '70vmin', width: '' }}>
        <canvas ref={chartRef} style={{ height: '100%', width:'100%' }} />
      </Container>
    </>
  );
}

export default PlayerWinChart;
