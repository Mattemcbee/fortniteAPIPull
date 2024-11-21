import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';
import SeasonStats from './FortniteSeasonStats.js';
import ColorPic from './flogo.png';
import TabPic from './flogo.png';

function Display({ isBlackAndWhite, toggleTheme }) {
  return (
    <Container fluid className={`displaySizing`}>
      <SeasonStats isBlackAndWhite={isBlackAndWhite} toggleTheme={toggleTheme} />
    </Container>
  );
}

export default Display;
