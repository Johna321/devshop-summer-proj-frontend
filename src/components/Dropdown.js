import React, { useEffect, useRef } from 'react';
import './Dropdown.scss';

const Dropdown = ({ option, options, toggled, setToggled, setOption, updateDropdown }) => {
  const ref = useRef();

  useEffect(() => {
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)){
        return;
      } 
      setToggled(false);
    }

    document.body.addEventListener('click', onBodyClick, {
      capture: true
    });

    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true
      });
    };
  }, []);

  const generateOptions = options => {
    return options.map(option => {
      return(
        <button 
          key={option}
          className="item"
          onClick={() => updateDropdown(option)}
        >
          {option}
        </button>
      );
    });
  };

  return(
    <div className="dropdown-parent">
      <button 
        ref={ref}
        className="dropdown-button"
        onClick={() => toggled ? setToggled(false) : setToggled(true)}
      >
        {option}
        <i className="dropdown icon" />
      </button>
      <div className={`dropdown-menu ${toggled ? 'visible' : ''}`}>
        {generateOptions(options)}
      </div>
    </div>
  );
};

export default Dropdown;
