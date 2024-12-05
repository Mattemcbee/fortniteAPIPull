import React from 'react';
import { Container } from 'react-bootstrap';
import './style.css';
import SeasonStats from './FortniteSeasonStats.js';
import ColorPic from './flogo.png';
import TabPic from './flogo.png';
import Thief from './thief1.jpg'

function MugshotDisplay() {
  return (
    <Container fluid className='text-center'>
              <h1 style={{fontSize:'35px', color:'white'}}>MUG SHOTS</h1>

      <img src={Thief} style={{height:'200px'}} />
      <h1 style={{fontSize:'25px', color:'white'}}>Panna</h1>
      <h1 style={{fontSize:'15px', color:'white'}}>1 count of kill stealing</h1>

    </Container>
  );
}

export default MugshotDisplay;
