import React, { useState } from 'react';
import './style.css';
import { Row, Col, Container, Button } from 'reactstrap';

const playerStatsDataC5S3 = [
  { name: 'Aaron', level: 71, kd: 2.031, kills: 195, wins: 3, minutesSpent: 99, matches: 99 },
  { name: 'Andrew', level: 25, kd: 2.4, kills: 36, wins: 0, minutesSpent: 15, matches: 15 },
  { name: 'Josh', level: 7, kd: 4, kills: 16, wins: 0, minutesSpent: 4, matches: 4 },
  { name: 'Matt', level: 75, kd: 2.663, kills: 245, wins: 4, minutesSpent: 96, matches: 96 },
  { name: 'Nick', level: 66, kd: 2.766, kills: 177, wins: 3, minutesSpent: 67, matches: 67 },
  { name: 'Panna', level: 69, kd: 3.171, kills: 222, wins: 3, minutesSpent: 73, matches: 73 },
  { name: 'Tommy', level: 3, kd: 2.5, kills: 5, wins: 0, minutesSpent: 2, matches: 2 }
];

const playerStatsDataC5S2 = [
  { name: 'Aaron', level: 127, kd: 2.661, kills: 825, wins: 27, minutesSpent: 3836, matches: 337 },
  { name: 'Andrew', level: 28, kd: 3.261, kills: 75, wins: 1, minutesSpent: 298, matches: 24 },
  { name: 'Josh', level: 33, kd: 4.24, kills: 106, wins: 1, minutesSpent: 265, matches: 34 },
  { name: 'Matt', level: 140, kd: 3.448, kills: 1362, wins: 32, minutesSpent: 4659, matches: 427 },
  { name: 'Nick', level: 100, kd: 3.223, kills: 448, wins: 18, minutesSpent: 1925, matches: 157 },
  { name: 'Panna', level: 142, kd: 2.828, kills: 1151, wins: 29, minutesSpent: 4644, matches: 436 },
  { name: 'Tommy', level: 54, kd: 3.569, kills: 182, wins: 3, minutesSpent: 590, matches: 56 }
];

const playerStatsDataC5S4 = [
  { name: 'Aaron', level: 113, kd: 2.912, kills: 0, wins: 0, minutesSpent: 0, matches: 219 },
  { name: 'Andrew', level: 114, kd: 4.217, kills: 0, wins: 0, minutesSpent: 0, matches: 185 },
  { name: 'Josh', level: 46, kd: 6.386, kills: 0, wins: 0, minutesSpent: 0, matches: 53 },
  { name: 'Matt', level: 131, kd: 3.216, kills: 0, wins: 0, minutesSpent: 0, matches: 368 },
  { name: 'Nick', level: 108, kd: 2.753, kills: 0, wins: 0, minutesSpent: 0, matches: 178 },
  { name: 'Panna', level: 123, kd: 3.407, kills: 0, wins: 0, minutesSpent: 0, matches: 330 },
  { name: 'Tommy', level: 77, kd: 5.154, kills: 0, wins: 0, minutesSpent: 0, matches: 115 }
];

const playerStatsDataC5S5 = [
  { name: 'Aaron', level: 83, kd: 3.791, kills: 0, wins: 0, minutesSpent: 0, matches: 145 },
  { name: 'Andrew', level: 59, kd: 4.568, kills: 0, wins: 0, minutesSpent: 0, matches: 42 },
  { name: 'Josh', level: 42, kd: 4.210, kills: 0, wins: 0, minutesSpent: 0, matches: 30 },
  { name: 'Matt', level: 81, kd: 3.377, kills: 0, wins: 0, minutesSpent: 0, matches: 150 },
  { name: 'Nick', level: 65, kd: 3.554, kills: 0, wins: 0, minutesSpent: 0, matches: 90 },
  { name: 'Panna', level: 79, kd: 5.213, kills: 0, wins: 0, minutesSpent: 0, matches: 133 },
  { name: 'Tommy', level: 60, kd: 5.437, kills: 0, wins: 0, minutesSpent: 0, matches: 78 }
];

const PlayerStatsDisplay = () => {
  const [currentSeason, setCurrentSeason] = useState('C5S2');
  const [currentSeasonName, setCurrentSeasonName] = useState('Season of Greek');

  const [playerStats, setPlayerStats] = useState(playerStatsDataC5S2);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'descending' });

  const sortTable = (key) => {
    let direction = 'descending';
    if (sortConfig.key === key && sortConfig.direction === 'descending') {
      direction = 'ascending';
    }

    const sortedData = [...playerStats].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortConfig({ key, direction });
    setPlayerStats(sortedData);
  };

  const getArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending'
        ? <span style={{ color: 'red' }}> ▲</span>
        : <span style={{ color: 'blue' }}> ▼</span>;
    }
    return null;
  };

  const handleSeasonChange = (season) => {
    setCurrentSeason(season);
    if (season === 'C5S2') {
      setPlayerStats(playerStatsDataC5S2);
      setCurrentSeasonName('Season of Greek Baddies');

    } else if (season === 'C5S3') {
      setPlayerStats(playerStatsDataC5S3);
      setCurrentSeasonName('Season of Car Shenanigans');

    } else if (season === 'C5S4') {
      setPlayerStats(playerStatsDataC5S4);
      setCurrentSeasonName('Season of Marvel Ads');

    }else if (season === 'C5S5') {
      setPlayerStats(playerStatsDataC5S5);
      setCurrentSeasonName('Season of Emotion Over Reason');

    }
  };

  return (
    <Container className='oldStatsBackground'>
      <h2 className='text-center'>Player Stats</h2>
      <Container className="text-center">
        <Row>
          <Col xs='3'>
            <Button color="secondary" onClick={() => handleSeasonChange('C5S2')}>C5S2</Button>
          </Col>
          <Col xs='3'>
            <Button color="secondary" onClick={() => handleSeasonChange('C5S3')}>C5S3</Button>
          </Col>
          <Col xs='3'>
            <Button color="secondary" onClick={() => handleSeasonChange('C5S4')}>C5S4</Button>
          </Col>
          <Col xs='3'>
            <Button color="secondary" onClick={() => handleSeasonChange('C5S5')}>C5S5</Button>
          </Col>

        </Row>
      </Container>
      <h1 className=''>{currentSeasonName}</h1>
      <div className='table-responsive'>
        <table className='oldStatsTable'>
          <thead>
            <tr>
              <th onClick={() => sortTable('name')}>Name{getArrow('name')}</th>
              <th onClick={() => sortTable('level')}>Level{getArrow('level')}</th>
              <th onClick={() => sortTable('matches')}>Matches{getArrow('matches')}</th>
              <th onClick={() => sortTable('kd')}>K/D{getArrow('kd')}</th>
              <th onClick={() => sortTable('kills')}>Kills{getArrow('kills')}</th>
              <th onClick={() => sortTable('wins')}>Wins{getArrow('wins')}</th>
              <th onClick={() => sortTable('minutesSpent')}>Time (hr){getArrow('minutesSpent')}</th>
            </tr>
          </thead>
          <tbody>
            {playerStats.map((player, index) => (
              <tr key={index}>
                <td>{player.name}</td>
                <td>{player.level}</td>
                <td>{player.matches}</td>
                <td>{player.kd.toFixed(2)}</td>
                <td>{player.kills}</td>
                <td>{player.wins}</td>
                <td>{(player.minutesSpent / 60).toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default PlayerStatsDisplay;
