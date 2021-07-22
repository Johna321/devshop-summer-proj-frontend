import React, { useState } from 'react';
import './Dropdown.scss';

const Dropdown = ({ option, toggled, setToggled, setOption, updateDropdown }) => {
  //const [toggled, setToggled] = useState(false);
  //const [option, setOption] = useState('Translate')
  //
  //const updateDropdown = (name) => {
  //  setToggled(false);
  //  setOption(name);
  //};

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
          onClick={() => updateDropdown('Translate')}
        >
          Translate
        </button>
        <button 
          className="item"
          onClick={() => updateDropdown('Text-to-speech')}
        >
          Text-to-speech
        </button>
        <button 
          className="item"
          onClick={() => updateDropdown('Image classifier')}
        >
          Image classifier
        </button>
      </div>
    </div>
  );
};

export default Dropdown;
