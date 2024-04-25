import React, { useState, useEffect } from 'react';
import playerList from './player_list.js';
import logo from './flogo.png';
import './style.css';
import { Container, Row, Col } from 'reactstrap';

function SeasonStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [kdStats, setkdStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlayerIndex, setExpandedPlayerIndex] = useState(-1); // Initially no player expanded

  const togglePlayerExpand = index => {
    if (expandedPlayerIndex === index) {
      setExpandedPlayerIndex(-1); // Collapse if already expanded
    } else {
      setExpandedPlayerIndex(index); // Expand if not expanded
    }
  };

  const fetchSeasonStats = async () => {
    try {
      const apiKey = '60729e20-c6f7-4b8c-83fc-d1f2b7e1a265';
      const allStats = [];
      for (let i = 0; i < playerList.length; i++) {
        const playerName = playerList[i];
        try {
          const response = await fetch(
            `https://fortnite-api.com/v2/stats/br/v2?name=${playerName}&timeWindow=season`,
            {
              headers: {
                Authorization: apiKey,
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Failed to fetch player stats for ${playerName}`);
          }
          const data = await response.json();
          if (!data.data) {
            throw new Error(`No data found for ${playerName}`);
          }
          const level = data.data.battlePass
            ? data.data.battlePass.level
            : 'N/A';
          const kd = data.data.stats
            ? parseFloat(data.data.stats.all.overall.kd).toFixed(2)
            : 'N/A';
          const kills = data.data.stats
            ? parseFloat(data.data.stats.all.overall.kills)
            : 'N/A';
          const wins = data.data.stats
            ? parseFloat(data.data.stats.all.overall.wins)
            : 'N/A';

          const matches = data.data.stats
            ? data.data.stats.all.overall.matches
            : 'N/A';
          const top3 = data.data.stats
            ? data.data.stats.all.overall.top3
            : 'N/A';    
          const top3per = (top3/matches*100).toFixed(1)
                   
          console.log(`Matches for ${playerName}:`, matches); // Add this line to log matches

          allStats.push({ name: playerName, level, kd, matches, kills, wins, top3, top3per });
        } catch (error) {
          console.error(
            `Error fetching stats for player ${playerName}:`,
            error
          );
          allStats.push({
            name: playerName,
            level: 'N/A',
            kd: 'N/A',
            matches: 'N/A',
          });
        }
        // Introduce a delay of 1 second between each request
        await new Promise(resolve => setTimeout(resolve, 700));
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

  useEffect(() => {
    fetchSeasonStats();
  }, []);

  if (loading) {
    return (
      <div className='centeredDiv backgroundImageLoad'>
        <img src={logo} className='App-logo' alt='logo' />
        <br />
        <h1 style={{color:'white'}}>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playerStats.length) {
    return <div>No player stats found</div>;
  }

  return (
    <Container style={{ textAlign: 'left', padding: '10px', marginBottom:'30px' }}>
      <h1 className='headerTextColor'>Season Player Stats by K/D</h1>
      <Container>
        {kdStats.map((player, index) => (
          <div key={index}>
            <Container className='upZ'>
              <Row
                className={`rankingText ${expandedPlayerIndex === index ? 'expanded' : ''
                  }`}
                onClick={() => togglePlayerExpand(index)}
                style={{
                  zIndex: 4,
                  marginTop: '10px'
                }}
              >
                <Col xs='1' className='numberFont'>
                  {index + 1}.
                </Col>
                <Col xs='9'>
                  <Row className=''>
                    <Col className=''>
                      <h1 className='nameFont'>{player.name}</h1>
                      <h1 className='statsFont'>
                        <strong>K/D:</strong> {player.kd}, <strong>Level:</strong>{' '}
                        {player.level}, <strong>Games Played:</strong>{' '}
                        {player.matches}
                      </h1>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>

            {expandedPlayerIndex === index && (
              <Container className='downZ'>

                <Row
                  className='expandedText statsRow'
                  style={{ zIndex: expandedPlayerIndex === index ? 0 : -1 }}
                >
                  <Col xs={{ offset: '1', size: '9' }}>
                    <div
                      className={`statsContainer ${expandedPlayerIndex === index ? 'slide-down' : ''}`}
                    >
                      <h1 className='statsFontExpand'>
                        <strong>Kills:</strong> {player.kills},{' '}
                        <strong>Wins:</strong> {player.wins},{' '}<br/>
                        <strong>Top 3:</strong> {player.top3} ({player.top3per}%)
                      </h1>
                    </div>
                  </Col>
                </Row>

              </Container>
            )}
          </div>
        ))}
      </Container>
    </Container>
  );
}

export default SeasonStats;
