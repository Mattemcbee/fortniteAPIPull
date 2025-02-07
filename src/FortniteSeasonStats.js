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
import playerStatsForChart from './player_stats.js';
import OldSeasonDisplay from './oldSeasonDisplay.jsx';
import Popup from './popup.jsx'; // Import the Popup component
import Webdown from './webdown'
import Email from './email.js'
import CourtEmail from './submitFortCourt.js'
import MugshotDisplay from './mugshotsDisplay'

function SeasonStats({ isBlackAndWhite, toggleTheme }) {
  const [playerStats, setPlayerStats] = useState([]);
  const [kdStats, setkdStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedPlayerIndex, setExpandedPlayerIndex] = useState(-1);
  const [totalKills, setTotalKills] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0); // Add state for total matches
  const [showKillList, setShowKillList] = useState(false);
  const [showOldSeason, setShowOldSeason] = useState(false);
  const [showPopup, setShowPopup] = useState(true);

  const togglePlayerExpand = index => {
    setExpandedPlayerIndex(expandedPlayerIndex === index ? -1 : index);
  };

  const toggleOldSeasonDisplay = () => {
    setShowOldSeason(prevShowOldSeason => !prevShowOldSeason);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 15000); // 15 seconds

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  const fetchSeasonStats = async () => {
    try {
      const apiKey = '60729e20-c6f7-4b8c-83fc-d1f2b7e1a265';
      const allStats = [];
      const MAX_RETRIES = 5;
      const CONCURRENCY_LIMIT = 1; // Number of simultaneous requests
      const DELAY_MS = 50; // Delay between requests in milliseconds
  
      const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  
      const fetchWithRetry = async (player, retries = 0) => {
        const { name: playerName, playerTag, accountType } = player;
        const url = `https://fortnite-api.com/v2/stats/br/v2?name=${playerTag}&timeWindow=season&accountType=${accountType}`;
  
        try {
          const response = await fetch(url, { headers: { Authorization: apiKey } });
          if (!response.ok) throw new Error(`Failed to fetch stats for ${playerName}`);
  
          const data = await response.json();
          if (!data.data) throw new Error(`No data found for ${playerName}`);
  
          const stats = data.data.stats ? data.data.stats.all.overall : {};
          const level = data.data.battlePass ? data.data.battlePass.level : 'N/A';
          const kd = stats.kd ? parseFloat(stats.kd).toFixed(2) : 'N/A';
          const kills = stats.kills ? parseFloat(stats.kills) : 'N/A';
          const wins = stats.wins ? parseFloat(stats.wins) : 'N/A';
          const matches = stats.matches ? stats.matches : 0;
          const scorePerMatch = stats.scorePerMatch ? stats.scorePerMatch : 'N/A';
          const top3 = stats.top3 ? stats.top3 : 'N/A';
          const top3per = matches !== 0 ? ((top3 / matches) * 100).toFixed(1) : 'N/A';
          const minutesPlayed = stats.minutesPlayed ? stats.minutesPlayed : 'N/A';
  
          return {
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
          };
        } catch (error) {
          if (retries < MAX_RETRIES) {
            console.warn(`Retrying ${playerName} (${retries + 1}/${MAX_RETRIES})...`);
            await delay(DELAY_MS); // Wait before retrying
            return await fetchWithRetry(player, retries + 1);
          } else {
            console.error(`Failed to fetch stats for ${playerName} after ${MAX_RETRIES} retries:`, error);
            return { name: playerName, level: 1, kd: 0, matches: 0 };
          }
        }
      };
  
      const executeWithLimit = async (players, limit) => {
        const results = [];
        const pool = [];
  
        for (const player of players) {
          const promise = fetchWithRetry(player).then((result) => results.push(result));
          pool.push(promise);
  
          // Wait for the pool to have fewer active promises than the limit
          if (pool.length >= limit) {
            await Promise.race(pool);
            pool.splice(pool.findIndex((p) => p === promise), 1);
          }
  
          await delay(DELAY_MS); // Wait before initiating the next request
        }
  
        await Promise.all(pool);
        return results;
      };
  
      const fetchedStats = await executeWithLimit(playerDict, CONCURRENCY_LIMIT);
  
      // Process fetched stats
      fetchedStats.forEach((stat) => allStats.push(stat));
  
      allStats.sort((a, b) => b.level - a.level);
      setPlayerStats(allStats);
  
      const totalKills = allStats.reduce((sum, player) => sum + (isNaN(player.kills) ? 0 : parseFloat(player.kills)), 0);
      setTotalKills(totalKills);
  
      const totalMatches = allStats.reduce((sum, player) => sum + (isNaN(player.matches) ? 0 : parseInt(player.matches)), 0);
      setTotalMatches(totalMatches);
  
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


  // Separate players based on match count
  const highMatchPlayers = playerStats.filter(player => parseInt(player.matches) >= (totalMatches/7)*.4);
  const lowMatchPlayers = playerStats.filter(player => parseInt(player.matches) < (totalMatches/7)*.4);
  //console.log((totalMatches/7)*.4)
  // Filtered KD stats for players with 10 or more matches
  const filteredKDStats = kdStats.filter(player => highMatchPlayers.some(p => p.name === player.name));

    return (
    <>
      <Container style={{ textAlign: 'left', padding: '10px', paddingBottom: '30px' }}>

        <Container>
          {filteredKDStats.map((player, index) => (

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
                        <h3 className='statsFontExpand'>
                          <h3 className='statsFontExpandTag'>{player.playerTag}</h3>
                          <strong>Kills:</strong> {player.kills}, <strong>Wins:</strong> {player.wins === 'N/A' ? 0 : player.wins}, <br />
                          <strong>Top 3:</strong> {player.top3} ({player.top3per}%)
                        </h3>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
            </div>
          ))}
                <h1 className='minScoreDisplay'>Min Games: {Math.ceil((totalMatches/7)*.4)} </h1>

        </Container>
        

       {/* <div className='separator' style={{ borderTop: '2px solid red', margin: '20px 0' }} /> */}

        <Container>
          {lowMatchPlayers.map((player, index) => (
            <Container key={index} className='upZ'>
              <Row
                className={`rankingText ${expandedPlayerIndex === index + highMatchPlayers.length ? 'expanded' : ''}`}
                onClick={() => togglePlayerExpand(index + highMatchPlayers.length)}
                style={{ zIndex: 4, marginTop: '10px' }}
              >
                <Col xs='3' className='alignVertical'>
                  <h1 style={{color: 'red', fontSize: 'small'}}>NOT ENOUGH MATCHES</h1>
                </Col>
                <Col xs='9'>
                  <Row>
                    <Col>
                      <h1 className='nameFont'>{player.name}</h1>
                      <h1 className='statsFont'>
                        <strong>K/D:</strong> {player.kd}, <strong>Level:</strong> {player.level},{' '}
                        <strong>Games:</strong> {player.matches}<span style={{color:'grey', fontSize:'smaller'}}>/{Math.ceil((totalMatches/7)*.4)}</span>
                      </h1>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {expandedPlayerIndex === index + highMatchPlayers.length && (
                <Container fluid className='downZ' style={{marginLeft:'-12px'}}>
                  <Row className='expandedText statsRow' style={{ zIndex: 0 }}>
                    <Col xs={{ offset: 1, size: 9 }}>
                      <div className={`statsContainer slide-down`}>
                        <h3 className='statsFontExpand'>
                          <h3 className='statsFontExpandTag'>{player.playerTag}</h3>
                          <strong>Kills:</strong> {player.kills}, <strong>Wins:</strong> {player.wins === 'N/A' ? 0 : player.wins}, <br />
                          <strong>Top 3:</strong> {player.top3} ({player.top3per}%)
                        </h3>
                      </div>
                    </Col>
                  </Row>
                </Container>
              )}
            </Container>
          ))}
        </Container>
        
        {/*<Webdown/>*/}
      </Container>

      <Container fluid className='buttonContainer text-center'>
        <Row className='' style={{ marginTop: '0px' }}>
          <Col>
            <Button
              onClick={toggleKillList}
              className='buttonStyle'
              style={{
                color: isBlackAndWhite ? 'black' : 'white',
                backgroundColor: isBlackAndWhite ? 'white' : '#b3c5c8',
                marginBottom: '20px'
              }}
            >
              {showKillList ? 'Hide Data' : 'More Data'}
            </Button>
          </Col>
          <Col>
            <Button
              onClick={toggleOldSeasonDisplay}
              className='buttonStyle'
              style={{
                color: isBlackAndWhite ? 'black' : 'white',
                backgroundColor: isBlackAndWhite ? 'white' : '#b3c5c8',
                marginBottom: '20px'
              }}
            >
              {showOldSeason ? 'Hide Old Stats' : 'See Old Stats'}
            </Button>
          </Col>
        </Row>
        {showOldSeason && <OldSeasonDisplay />}
      </Container>

      {showKillList && (
        <>
          <h2 className='headerTextColorComparison'>Comparison with Historical Deaths:</h2>
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
          <Email />
          <CourtEmail/>
          <MugshotDisplay />
        </>
      )}
      <h2 className='tagFont text-center' style={{marginTop: '30px'}}>Brought to you by Matt. Thank you Matt</h2>
    </>
  );
}

export default SeasonStats;
