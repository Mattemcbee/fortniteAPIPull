import React, { useState, useEffect } from 'react';

function FortnitePlayerInfo() {
  const [playerStats, setPlayerStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const apiKey = "60729e20-c6f7-4b8c-83fc-d1f2b7e1a265";
        const response = await fetch("https://fortnite-api.theapinetwork.com/prod09/users/public/br_stats_v2?user_id=4735ce9132924caf8a5b17789b40f79c", {
          method: 'GET',
          headers: {
            Authorization: apiKey,
          },
          redirect: 'follow'
        });
        if (!response.ok) {
          throw new Error('Failed to fetch player stats');
        }
        const data = await response.text();
        setPlayerStats(data);
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

  if (!playerStats) {
    return <div>Player stats not found</div>;
  }

  return (
    <div>
      <h1>Fortnite Player Stats</h1>
      <pre>{playerStats}</pre>
    </div>
  );
}

export default FortnitePlayerInfo;
