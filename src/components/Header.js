import React from "react";

const Header = ({ entry, setEntry, handleSubmit }) => {
  return (
    <div className='header'>
      <div className='container'>
        <div className='entry'>
          <input
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            type='number'
          />
          <button onClick={handleSubmit}>SET</button>
        </div>

        <h1 className='py-1'>Voltage Plotting</h1>
        <div className='something'></div>
      </div>
    </div>
  );
};

export default Header;
