import React from 'react';
import './App.scss';
import Dropdown from './Dropdown';

const App = () => {
  return (
    <div>
      <div className="title">
        <b>Pear.</b>
      </div>
      <div className="parent">
        <div className="main-box">
          <Dropdown />
        </div>
      </div>
    </div>
  );
};

export default App;
