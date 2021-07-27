import React,{ useState } from 'react';
import './Translate.scss';
import Dropdown from './Dropdown';

const Translate = () => {
  const [text, setText] = useState('');
  const [inputLang, setInputLang] = useState('English');
  const [toggledInput, setToggledInput] = useState(false);

  const onTextChange = e => {
    setText(e.target.value);
  }

  const updateInputLangDropdown = name => {
    setToggledInput(false);
    setInputLang(name);
  }

  return(
    <div className="translate-container">
      <Dropdown 
        option={inputLang}
        options={['English', 'Japanese', 'Spanish']}
        toggled={toggledInput}
        setOption={setInputLang}
        setToggled={setToggledInput}
        updateDropdown={updateInputLangDropdown}
      />
      <textarea 
        className="translate-box" 
        spellCheck="false"
        onChange={onTextChange}        
      />
      <div style={{userSelect: 'none'}} className="translate-box">
        {text}
      </div>
    </div>
  );
};

export default Translate;
