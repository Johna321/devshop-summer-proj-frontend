import React,{ useState } from 'react';
import axios from 'axios';
import './Translate.scss';
import Dropdown from './Dropdown';

const Translate = () => {
  const [text, setText] = useState('');

  const [inputLang, setInputLang] = useState('English');
  const [toggledInput, setToggledInput] = useState(false);

  const [outputLang, setOutputLang] = useState('English');
  const [toggledOutput, setToggledOutput] = useState(false);

  const onTextChange = e => {
    setText(e.target.value);
  }

  const updateInputLangDropdown = name => {
    setToggledInput(false);
    setInputLang(name);
  }

  const updateOutputLangDropdown = name => {
    setToggledOutput(false);
    setOutputLang(name);
  }

  const fetchTranslation = async(e) => {
    let { data } = await axios.post('http://localhost:3001/translate', {
      input_lang: 'en',
      output_lang: 'es',
      original_text: e.target.value
    })
    console.log(data.translated_text);
    setText(data.translated_text);
  }

  return(
    <div className="translate-container">
      <div className="translate-text-container">
        <textarea 
          className="translate-text" 
          spellCheck="false"
          onChange={fetchTranslation}        
          maxLength="806"
        />
        <Dropdown 
          style={{
            parent: 'translate-dropdown-parent',
            button: 'translate-dropdown-button',
            menu: 'translate-dropdown-menu'
          }}
          option={inputLang}
          options={['English', 'Reverse', 'Spanish']}
          toggled={toggledInput}
          setOption={setInputLang}
          setToggled={setToggledInput}
          updateDropdown={updateInputLangDropdown}
        />
      </div>
      <div className="translate-text-container">
        <div className="translate-text">
          {text}
        </div>
        <Dropdown 
          style={{
            parent: 'translate-dropdown-parent',
            button: 'translate-dropdown-button',
            menu: 'translate-dropdown-menu'
          }}
          option={outputLang}
          options={['English', 'Reverse', 'Spanish']}
          toggled={toggledOutput}
          setOption={setOutputLang}
          setToggled={setToggledOutput}
          updateDropdown={updateOutputLangDropdown}
        />
      </div>
    </div>
  );
};

export default Translate;
