import React, { useState, useEffect } from 'react';
import './style.css';
import FortnitePlayerStats from './FortnitePlayerStats.js';
import { Container } from 'react-bootstrap';
import quoteList from './quote_list.js';

function InspirationTimed() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quoteList.length);
      setFadeIn(true);
      setTimeout(() => setFadeIn(false), 1000); // Reset fade-in after 1 second
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container fluid className='displaySizing'>
      <h1 className={fadeIn ? 'inspoText fade-in' : 'inspoText'}>{quoteList[currentQuoteIndex]}</h1>
    </Container>
  );
}

export default InspirationTimed;
