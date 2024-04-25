import './style.css';
import Display from './display.js'
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container fluid className="backgroundImage" >
      <Display />
    </Container>
  );
}

export default App;