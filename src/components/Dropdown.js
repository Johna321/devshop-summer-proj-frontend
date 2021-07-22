import React, { useState } from 'react';
import './Dropdown.scss';

const Dropdown = () => {
  const [toggled, setToggled] = useState(false);
  const [option, setOption] = useState('Translate')
  return(
    <div className="dropdown-parent">
      <button 
        className="dropdown-button"
        onClick={() => toggled ? setToggled(false) : setToggled(true)}
      >
        {option}
        <i className="dropdown icon" />
      </button>
      <div className={`dropdown-menu ${toggled ? 'visible' : ''}`}>
        <button 
          className="item"
          onClick={() => {setOption('Translate'); setToggled(false);}}
        >
          Translate
        </button>
        <button 
          className="item"
          onClick={() => {setOption('Text-to-speech'); setToggled(false);}}
        >
          Text-to-speech
        </button>
        <button 
          className="item"
          onClick={() => {setOption('Image classifier'); setToggled(false);}}
        >
          Image classifier
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
