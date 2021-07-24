import React,{ useState } from 'react';
import './Translate.scss';

const Translate = () => {
  const [text, setText] = useState('');
  const onTextChange = (e) => {
    setText(e.target.value);
  }
  return(
    <div className="translate-container">
      <textarea 
        className="translate-box" 
        spellCheck="false"
        onChange={onTextChange}        
      />
      <div className="translate-box">
        {text}
      </div>
    </div>
  );
};

export default Translate;
