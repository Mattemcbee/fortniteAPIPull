import React, { useState, useEffect } from 'react';
import playerDict from './player_list.js';
import logo from './flogo.png';
import './style.css';
import { Container, Row, Col, Button } from 'reactstrap';
import InspirationRandom from './inspirationRandom.jsx';
import killList from './total_kill_list.js';

function SeasonStats() {
  const [playerStats, setPlayerStats] = useState([]);
  const [kdStats, setkdStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlayerIndex, setExpandedPlayerIndex] = useState(-1);
  const [totalKills, setTotalKills] = useState(0);
  const [showKillList, setShowKillList] = useState(false);

  const togglePlayerExpand = index => {
    if (expandedPlayerIndex === index) {
      setExpandedPlayerIndex(-1);
    } else {
      setExpandedPlayerIndex(index);
    }
  };

  const fetchSeasonStats = async () => {
    try {
      const apiKey = '60729e20-c6f7-4b8c-83fc-d1f2b7e1a265';
      const allStats = [];
      for (let i = 0; i < playerDict.length; i++) {
        const playerName = playerDict[i].name;
        const playerTag = playerDict[i].playerTag;
        const accountType = playerDict[i].accountType;

        try {
          const response = await fetch(
            `https://fortnite-api.com/v2/stats/br/v2?name=${playerTag}&timeWindow=season&accountType=${accountType}`,
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
          const level = data.data.battlePass ? data.data.battlePass.level : 'N/A';
          const kd = data.data.stats ? parseFloat(data.data.stats.all.overall.kd).toFixed(2) : 'N/A';
          const kills = data.data.stats ? parseFloat(data.data.stats.all.overall.kills) : 'N/A';
          const wins = data.data.stats ? parseFloat(data.data.stats.all.overall.wins) : 'N/A';
          const matches = data.data.stats ? data.data.stats.all.overall.matches : 'N/A';
          const scorePerMatch = data.data.stats ? data.data.stats.all.overall.scorePerMatch : 'N/A';
          const top3 = data.data.stats ? data.data.stats.all.overall.top3 : 'N/A';
          const top3per = ((top3 / matches) * 100).toFixed(1);

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
          });
        } catch (error) {
          console.error(`Error fetching stats for player ${playerName}:`, error);
          allStats.push({
            name: playerName,
            level: 'N/A',
            kd: 'N/A',
            matches: 'N/A',
          });
        }
        await new Promise(resolve => setTimeout(resolve, 700));
      }
      allStats.sort((a, b) => b.level - a.level);
      setPlayerStats(allStats);

      let totalKills = 0;
      allStats.forEach(player => {
        if (!isNaN(player.kills)) {
          totalKills += parseFloat(player.kills);
        }
      });
      setTotalKills(totalKills);

      const kdSort = [...allStats];
      kdSort.sort((a, b) => b.kd - a.kd);
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
      <div className=' backgroundImageLoad centeredDiv'>
        <img src={logo} className='App-logo ' alt='logo' />
        <br />
        <h1 style={{ color: 'white' }}>Loading...</h1>
        <InspirationRandom />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!playerStats.length) {
    return <div>No player stats found</div>;
  }

  // Dynamically replace "Our total kills this season" with the actual total kills
  const updatedKillList = [...killList];
  const ourTotalKillsIndex = updatedKillList.findIndex(item => item.battle === 'Our total kills this season');
  if (ourTotalKillsIndex !== -1) {
    updatedKillList[ourTotalKillsIndex].deaths = totalKills;
  }

  // Sort the killList by deaths in descending order
  updatedKillList.sort((a, b) => b.deaths - a.deaths);

  return (
    <Container style={{ textAlign: 'left', padding: '10px', marginBottom: '30px' }}>
      <h1 className='headerTextColor'>Season Player Stats by K/D</h1>
      <Container>
        {kdStats.map((player, index) => (
          <div key={index}>
            <Container className='upZ'>
              <Row
                className={`rankingText ${expandedPlayerIndex === index ? 'expanded' : ''}`}
                onClick={() => togglePlayerExpand(index)}
                style={{
                  zIndex: 4,
                  marginTop: '10px',
                }}
              >
                <Col xs='1' className='numberFont'>
                  {index + 1}.
                </Col>
                <Col xs='9'>
                  <Row className=''>
                    <Col className=''>
                      <h1 className='nameFont'>{player.name} </h1>
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
                <Row
                  className='expandedText statsRow'
                  style={{ zIndex: expandedPlayerIndex === index ? 0 : -1 }}
                >
                  <Col xs={{ offset: '1', size: '9' }}>
                    <div className={`statsContainer ${expandedPlayerIndex === index ? 'slide-down' : ''}`}>
                      <h1 className='statsFontExpand'>
                        <h1 className='statsFontExpandTag'>{player.playerTag}</h1>
                        <strong>Kills:</strong> {player.kills}, <strong>Wins:</strong> {player.wins}, <br />
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
      <Container fluid >
        <Container className='buttonContainer text-center'>
        <Button onClick={toggleKillList} className='buttonColor' style={{color:'black', backgroundColor:'#FFF9C4'}}>
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
          </>
        )}
      </Container>
    </Container>
  );
}

export default SeasonStats;
