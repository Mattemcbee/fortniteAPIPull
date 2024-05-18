import React, { useState, useEffect } from 'react'; // Make sure you import React
import './style.css';
import FortnitePlayerStats from './FortnitePlayerStats.js';
import { Container } from 'react-bootstrap';
import quoteList from './quote_list.js';

function InspirationRandom() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quoteList.length);
    setCurrentQuoteIndex(randomIndex);
  }, []); // Empty dependency array ensures the effect runs only once, after the component mounts

  return (
    <Container fluid className='displaySizing'>
      <h1 className='inspoText fade-in'>{quoteList[currentQuoteIndex]}</h1>
    </Container>
  );
}

export default InspirationRandom;
