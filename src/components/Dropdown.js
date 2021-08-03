import React, { useEffect, useRef } from 'react';
import './Dropdown.scss';

const Dropdown = ({ style, icon, option, options, toggled, setToggled, setOption, updateDropdown, reverse }) => {
  const ref = useRef();

  if (!style){
    style = {
      parent: 'dropdown-parent',
      button: 'dropdown-button',
      menu: 'dropdown-menu'
    }
  }

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
  }, [setToggled]);

  const generateOptions = options => {
    if (reverse){
      options = options.reverse();
    }
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
    <div className={style.parent}>
      <button 
        ref={ref}
        className={style.button}
        onClick={() => toggled ? setToggled(false) : setToggled(true)}
      >
        {option}
        {icon ? <i className="dropdown icon" /> : ''}
      </button>
      <div className={`${style.menu} ${toggled ? 'visible' : ''}`}>
        {generateOptions(options)}
      </div>
    </div>
  );
};

export default Dropdown;
