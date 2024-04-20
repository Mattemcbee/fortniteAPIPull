import logo from './logo.svg';
import './App.css';
import FortnitePlayerStats from './FortnitePlayerStats.js'
import Display from './displayScores.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <FortnitePlayerStats/>
      </header>
    </div>
  );
}

export default App;
//        <img src={logo} className="App-logo" alt="logo" />
