import React from 'react'; // Make sure you import React
import './style.css';
import FortnitePlayerStats from './FortnitePlayerStats.js';
import SeasonStats from './FortniteSeasonStats.js';
// Import Container from the correct library (e.g., Bootstrap)
import { Container } from 'react-bootstrap';


function Display() {
  return (
    <Container fluid className='displaySizing'>
        <SeasonStats/>
    </Container>
  );
}

export default Display;