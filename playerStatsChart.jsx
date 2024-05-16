import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-trendline';
import { Container } from 'react-bootstrap';

function PlayerStatsChart({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (data.length === 0 || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const playerNames = [...new Set(data.map(entry => entry.name))];
    const playerData = playerNames.map(player => ({
      name: player,
      levels: [],
      kds: []
    }));

    data.forEach(entry => {
      const playerIndex = playerData.findIndex(player => player.name === entry.name);
      playerData[playerIndex].levels.push(entry.level);
      playerData[playerIndex].kds.push(entry.kd);
    });

    const datasets = playerNames.map(player => {
      const nextColor = getNextColor();
      const playerEntries = data.filter(entry => entry.name === player);
      const playerKDs = playerEntries.map(entry => entry.kd);
      return {
        label: player,
        data: playerKDs,
        backgroundColor: nextColor,
        borderColor: nextColor,
        borderWidth: 1
      };
    });

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: playerData[0].levels,
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Level'
            },
            ticks: {
              display: false,
              color: 'white',
            }
          },
          y: {
            title: {
              display: true,
              text: 'KD'
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
            }
          },
          trendline: {
            lines: {
              drawPoints: true,
              pointStyle: 'circle',
              pointRadius: 4,
              pointBorderColor: ({ datasetIndex }) => datasets[datasetIndex].backgroundColor,
              pointBackgroundColor: ({ datasetIndex }) => datasets[datasetIndex].backgroundColor
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
  }, [data]);

  return (
    <Container className='graphBackground'>
      <h1 className='text-center'>K/D PER LEVEL</h1>
      <canvas ref={chartRef} style={{ height: '80vmin', width: '100%' }} />
    </Container>
  );
}

const colorPool = ["#FF6961", "#B39EB5","#FFA07A", "#FFD700", "#77DD77", "#ADD8E6", "#FFB6C1", "#C9C0BB"];
let colorIndex = 0;

function getNextColor() {
  const nextColor = colorPool[colorIndex];
  colorIndex = (colorIndex + 1) % colorPool.length;
  return nextColor;
}

export default PlayerStatsChart;
