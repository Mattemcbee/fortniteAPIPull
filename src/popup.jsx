import React from 'react';

const Popup = ({ message }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{message}</h2>
      </div>
    </div>
  );
};

export default Popup;
