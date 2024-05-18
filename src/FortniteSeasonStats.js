import React, { useState, useEffect } from 'react';
import playerDict from './player_list.js';
import logo from './flogo.png';
import './style.css';
import { Row, Col, Container, Button } from 'reactstrap';
import InspirationRandom from './inspirationRandom.jsx';
import killList from './total_kill_list.js';
import PlayerStatsChart from './playerStatsChart.jsx';
import PlayerWinChart from './playerWinChart.jsx';
import CombinedList from './minutesDisplay.jsx';
import playerStatsForChart from './player_stats.js'

function SeasonStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [kdStats, setkdStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlayerIndex, setExpandedPlayerIndex] = useState(-1);
  const [totalKills, setTotalKills] = useState(0);
  const [showKillList, setShowKillList] = useState(false);

  const togglePlayerExpand = index => {
    setExpandedPlayerIndex(expandedPlayerIndex === index ? -1 : index);
  };

  const fetchSeasonStats = async () => {
    try {
      const apiKey = '60729e20-c6f7-4b8c-83fc-d1f2b7e1a265';
      const allStats = [];
      for (let i = 0; i < playerDict.length; i++) {
        const { name: playerName, playerTag, accountType } = playerDict[i];

        try {
          const response = await fetch(
            `https://fortnite-api.com/v2/stats/br/v2?name=${playerTag}&timeWindow=season&accountType=${accountType}`,
            { headers: { Authorization: apiKey } }
          );
          if (!response.ok) throw new Error(`Failed to fetch player stats for ${playerName}`);

          const data = await response.json();
          if (!data.data) throw new Error(`No data found for ${playerName}`);

          const stats = data.data.stats ? data.data.stats.all.overall : {};
          const level = data.data.battlePass ? data.data.battlePass.level : 'N/A';
          const kd = stats.kd ? parseFloat(stats.kd).toFixed(2) : 'N/A';
          const kills = stats.kills ? parseFloat(stats.kills) : 'N/A';
          const wins = stats.wins ? parseFloat(stats.wins) : 'N/A';
          const matches = stats.matches ? stats.matches : 'N/A';
          const scorePerMatch = stats.scorePerMatch ? stats.scorePerMatch : 'N/A';
          const top3 = stats.top3 ? stats.top3 : 'N/A';
          const top3per = matches !== 'N/A' ? ((top3 / matches) * 100).toFixed(1) : 'N/A';
          const minutesPlayed = stats.minutesPlayed ? stats.minutesPlayed : 'N/A';

          allStats.push({
            name: playerName,
            playerTag,
            level,
            kd,
            matches,
            kills,
            wins,
            top3,
            top3per,
            scorePerMatch,
            minutesPlayed,
          });
        } catch (error) {
          console.error(`Error fetching stats for player ${playerName}:`, error);
          allStats.push({ name: playerName, level: 'N/A', kd: 'N/A', matches: 'N/A' });
        }

        await new Promise(resolve => setTimeout(resolve, 700));
      }

      allStats.sort((a, b) => b.level - a.level);
      setPlayerStats(allStats);

      const totalKills = allStats.reduce((sum, player) => sum + (isNaN(player.kills) ? 0 : parseFloat(player.kills)), 0);
      setTotalKills(totalKills);

      const kdSort = [...allStats].sort((a, b) => b.kd - a.kd);
      setkdStats(kdSort);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSeasonStats();
  }, []);

  const toggleKillList = () => {
    setShowKillList(!showKillList);
  };

  if (loading) {
    return (
      <div className='backgroundImageLoad centeredDiv'>
        <img src={logo} className='App-logo' alt='logo' />
        <br />
        <h1 style={{ color: 'white' }}>Loading...</h1>
        <InspirationRandom />
      </div>
    );
  }

  if (error) return <div>Error: {error}</div>;

  if (!playerStats.length) return <div>No player stats found</div>;

  const updatedKillList = [...killList];
  const ourTotalKillsIndex = updatedKillList.findIndex(item => item.battle === 'Our total kills this season');
  if (ourTotalKillsIndex !== -1) updatedKillList[ourTotalKillsIndex].deaths = totalKills;

  updatedKillList.sort((a, b) => b.deaths - a.deaths);

  const dynamicWinsList = kdStats.map(player => ({ name: player.name, wins: player.wins }));

  return (
    <Container style={{ textAlign: 'left', padding: '10px', paddingBottom: '40px' }}>
      <h1 className='headerTextColor'>Season Player Stats by K/D</h1>
      <Container>
        {kdStats.map((player, index) => (
          <div key={index}>
            <Container className='upZ'>
              <Row
                className={`rankingText ${expandedPlayerIndex === index ? 'expanded' : ''}`}
                onClick={() => togglePlayerExpand(index)}
                style={{ zIndex: 4, marginTop: '10px' }}
              >
                <Col xs='1' className='numberFont'>{index + 1}.</Col>
                <Col xs='9'>
                  <Row>
                    <Col>
                      <h1 className='nameFont'>{player.name}</h1>
                      <h1 className='statsFont'>
                        <strong>K/D:</strong> {player.kd}, <strong>Level:</strong> {player.level},{' '}
                        <strong>Games Played:</strong> {player.matches}
                      </h1>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Container>
            {expandedPlayerIndex === index && (
              <Container className='downZ'>
                <Row className='expandedText statsRow' style={{ zIndex: 0 }}>
                  <Col xs={{ offset: 1, size: 9 }}>
                    <div className={`statsContainer slide-down`}>
                      <h1 className='statsFontExpand'>
                        <h1 className='statsFontExpandTag'>{player.playerTag}</h1>
                        <strong>Kills:</strong> {player.kills}, <strong>Wins:</strong> {player.wins === 'N/A' ? 0 : player.wins}, <br />
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
      <Container fluid>
        <Container className='buttonContainer text-center'>
          <Button onClick={toggleKillList} className='buttonColor' style={{ color: 'black', backgroundColor: '#FFF9C4' }}>
            {showKillList ? 'Hide Data' : 'More Data'}
          </Button>
        </Container>
        {showKillList && (
          <>
            <h1 className='headerTextColorComparison'>Comparison with Historical Deaths:</h1>
            {updatedKillList.map((kill, index) => (
              <Row key={index} className={kill.battle === 'Our total kills this season' ? 'yellowRow' : 'otherRow'}>
                <Col>{kill.battle}</Col>
                <Col xs='2' className='headerTextColorComparisonContainer'>{kill.deaths}</Col>
              </Row>
            ))}
            <Container fluid style={{ marginTop: '30px' }}>
              <Row>
                <Col xs='12' sm='6'>
                  <PlayerStatsChart data={playerStatsForChart} />
                </Col>
                <Col xs='12' sm='6'>
                  <PlayerWinChart wins={dynamicWinsList} />
                </Col>
              </Row>
              <CombinedList playerStats={playerStats} />
            </Container>
          </>
        )}
      </Container>
      <h1 className='tagFont text-center'>Brought to you by Matt. Thank you Matt</h1>
    </Container>
  );
}

export default SeasonStats;
