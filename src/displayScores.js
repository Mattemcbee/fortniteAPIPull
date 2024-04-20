import playerList from "./player_list";

import React from 'react';
import FortnitePlayerStats from './FortnitePlayerStats'; // Assuming you have the FortnitePlayerStats component defined

function Display() {
  return (
    <div>
      <h1>Player Stats</h1>
      {playerList.map((player, index) => (
        <div key={index}>
          <h2>Player: {player}</h2>
          <FortnitePlayerStats playerName={player} />
        </div>
      ))}
    </div>
  );
}

export default Display;
