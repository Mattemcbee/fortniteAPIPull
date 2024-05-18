import React from 'react';
import historicalMinuteList from './historical_minute_list';
import { Container, Row, Col } from 'reactstrap';

const CombinedList = ({ playerStats }) => {
  // Extract the minutesPlayed from the playerStats prop
  const minuteList = playerStats.map(player => ({ name: player.name, minutesPlayed: player.minutesPlayed }));

  // Calculate total minutes played from minuteList
  const totalMinutesPlayed = minuteList.reduce((total, player) => total + (isNaN(player.minutesPlayed) ? 0 : player.minutesPlayed), 0);

  // Combine the lists and include total minutes played
  const combinedList = [
    ...minuteList,
    { name: 'Total All Players', minutesPlayed: totalMinutesPlayed },
    ...historicalMinuteList,
  ];

  // Sort the combined list by minutesPlayed in descending order
  combinedList.sort((a, b) => b.minutesPlayed - a.minutesPlayed);

  return (
    <Container fluid className=''>
      <h1 className='minutesHeaderText text-center'>Time Playing This Season</h1>
      <Row>
        <Col xs={{ size: 2, offset: 8 }} sm={{ size: 2, offset: 7 }}>
          <h1 className='minutesTextEven'>Days</h1>
        </Col>
        <Col xs={{ size: 1, offset: 0 }}>
          <h1 className='minutesTextEven'>Hours</h1>
        </Col>
      </Row>
      {combinedList.map((item, index) => (
        <Row key={index} className={`align-items-center ${['Matt', 'Aaron', 'Panna', 'Total All Players', 'Tommy', 'Josh', 'Nick', 'Aaron', 'Andrew'].includes(item.name) ? 'minutesTextEven' : 'minutesText'}`}>
          <Col xs={{ size: 8, offset: 0 }} sm={{ size: 5, offset: 2 }}>{item.name}</Col>
          <Col xs='2'>{(item.minutesPlayed / (60 * 24)).toFixed(1)}</Col>
          <Col xs='1'>{(item.minutesPlayed / 60).toFixed(1)}</Col>
        </Row>
      ))}
    </Container>
  );
};

export default CombinedList;
