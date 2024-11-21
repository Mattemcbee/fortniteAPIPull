import './style.css';
import Display from './display.js';
import { Row, Col, Container, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ColorPic from './flogo.png';
import TabPic from './blackLogo.png';
import React, { useState } from 'react';

function App() {
  const [isBlackAndWhite, setIsBlackAndWhite] = useState(false);

  const toggleTheme = () => {
    setIsBlackAndWhite(!isBlackAndWhite);
  };

  return (
    <Container fluid className={`${isBlackAndWhite ? 'blackAndWhite' : 'backgroundImage'} App`}>
      <Row>
        <Col xs='12'>
          <h2 className='headerTextColor'>Season Player Stats by K/D</h2>
          </Col>
         

      </Row>
      <Display isBlackAndWhite={isBlackAndWhite} toggleTheme={toggleTheme} />
    </Container>
  );
}

export default App;
/*
<Col xs='2' className="d-flex align-items-center justify-content-center"> 
<span onClick={toggleTheme}>
{isBlackAndWhite ? <img src={ColorPic} style={{ width: '40px' }} alt='Color Theme' /> : <img src={TabPic} style={{ width: '40px' }} alt='Black and White Theme' />}
</span>
</Col>
*/
