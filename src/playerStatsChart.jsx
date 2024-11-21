import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-plugin-trendline';
import { Container } from 'react-bootstrap';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAVgwRf_9RDmNnj8zfRetKSoJPtTUFI-dE",
  authDomain: "fortniteprogressdata.firebaseapp.com",
  projectId: "fortniteprogressdata",
  storageBucket: "fortniteprogressdata.firebasestorage.app",
  messagingSenderId: "598366329794",
  appId: "1:598366329794:web:aa843d8a39967a3a1a545b",
  measurementId: "G-6M8B4HZ75Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function PlayerStatsChart() {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'fortnitePlayerStats'));
        const fetchedData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(fetchedData);
        // Log the stats of each player
        fetchedData.forEach(player => {
          console.log(player); // Logs the stats array for each player
        });
      } catch (error) {
        console.error("Error fetching data from Firestore: ", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length === 0 || !chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const levelMap = {};
    const datasets = data.map((entry, index) => {
      const nextColor = getNextColor();
      const playerName = ['Aaron', 'Andrew', 'Josh', 'Tommy', 'Matt', 'Nick', 'Panna'][index % 7];
      
      entry.stats.forEach(stat => {
        // Initialize level data if it doesn't exist
        if (!levelMap[stat.level]) {
          levelMap[stat.level] = {};
        }
        // Store the K/D value for each level
        levelMap[stat.level][playerName] = stat.kd;
      });

      return {
        label: playerName,
        data: entry.stats.map(stat => stat.kd), // This will be replaced by sorted data
        backgroundColor: nextColor,
        borderColor: nextColor,
        borderWidth: 1,
        pointRadius: 1.5,
        pointBackgroundColor: nextColor,
        pointBorderColor: nextColor,
      };
    });

    // Sort levels and prepare datasets
    const sortedLevels = Object.keys(levelMap).sort((a, b) => a - b);

    // Map the K/D values to the sorted levels for each dataset
// Map the K/D values to the sorted levels for each dataset
datasets.forEach(dataset => {
  dataset.data = sortedLevels.map(level => {
    const kdValue = levelMap[level]?.[dataset.label] ?? NaN; // Replace `null` with `NaN`
    console.log(`Level: ${level}, Player: ${dataset.label}, K/D Value: ${kdValue}`);
    return kdValue;
  });
  dataset.spanGaps = true; // Enable spanGaps for each dataset
});

    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: sortedLevels,
        datasets: datasets
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Level',
              color: 'white',
            },
            ticks: {
              color: 'white',
            }
          },
          y: {
            title: {
              display: true,
              text: 'KD',
              color: 'white',
            },
            ticks: {
              color: 'white',
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: 'white'
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
      <h2 className='text-center'>K/D PER LEVEL</h2>
      <canvas ref={chartRef} style={{ height: '80vmin', width: '100%' }} />
    </Container>
  );
}

const colorPool = ["#FF6961", "#B39EB5", "#FFA07A", "#FFD700", "#77DD77", "#ADD8E6", "#FFB6C1", "#C9C0BB"];
let colorIndex = 0;

function getNextColor() {
  const nextColor = colorPool[colorIndex];
  colorIndex = (colorIndex + 1) % colorPool.length;
  return nextColor;
}

export default PlayerStatsChart;
