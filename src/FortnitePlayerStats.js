import React, { useState, useEffect } from 'react';
import playerList from './player_list.js';

function FortnitePlayerStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [kdStats, setkdStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const apiKey = "60729e20-c6f7-4b8c-83fc-d1f2b7e1a265";
        const allStats = [];
        for (let i = 0; i < playerList.length; i++) {
          const playerName = playerList[i];
          try {
            const response = await fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${playerName}`, {
              headers: {
                Authorization: apiKey,
              },
            });
            if (!response.ok) {
              throw new Error(`Failed to fetch player stats for ${playerName}`);
            }
            const data = await response.json();
            if (!data.data) {
              throw new Error(`No data found for ${playerName}`);
            }
            const level = data.data.battlePass ? data.data.battlePass.level : 'N/A';
            const kd = data.data.stats ? parseFloat(data.data.stats.all.overall.kd).toFixed(2) : 'N/A';
            const matches = data.data.stats ? data.data.stats.all.overall.matches : 'N/A';
            console.log(`Matches for ${playerName}:`, matches); // Add this line to log matches
            
            allStats.push({ name: playerName, level, kd, matches });
          } catch (error) {
            console.error(`Error fetching stats for player ${playerName}:`, error);
            allStats.push({ name: playerName, level: 'N/A', kd: 'N/A', matches: 'N/A' });
          }
          // Introduce a delay of 1 second between each request
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
        // Sort the playerStats array by level in descending order
        allStats.sort((a, b) => b.level - a.level);
        setPlayerStats(allStats);

        // Sort allStats by KD in descending order
        const kdSort = [...allStats]; // Create a copy of allStats array
        kdSort.sort((a, b) => b.kd - a.kd);
        setkdStats(kdSort); // Set kdSort to kdStats state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayerStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playerStats.length) {
    return <div>No player stats found</div>;
  }

  return (
    <div style={{ textAlign: 'left' }}>
      <h1>Fortnite Player Stats by K/D</h1>
      {kdStats.map((player, index) => (
        <div key={index} style={{ backgroundColor: 'black', color: 'white', padding: '10px', marginBottom: '10px', textAlign: 'left' }}>
          {index + 1}. {player.name}, <strong>K/D:</strong> {player.kd}, <strong>Level:</strong> {player.level} <strong>Games Played:</strong> {player.matches}
        </div>
      ))}
      <h1>Fortnite Player Level</h1>
      {playerStats.map((player, index) => (
        <div key={index} style={{ backgroundColor: 'black', color: 'white', padding: '10px', marginBottom: '10px', textAlign: 'left' }}>
          {index + 1}. {player.name}, <strong>Level:</strong> {player.level}, <strong>K/D:</strong> {player.kd} <strong>Games Played:</strong> {player.matches}
        </div>
      ))}
    </div>
  );
}

export default FortnitePlayerStats;
