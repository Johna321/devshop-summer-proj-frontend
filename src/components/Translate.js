import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Translate.scss';
import Dropdown from './Dropdown';

const languages = {
  'English': {code: 'en', langVoice: 'Joey'},
  'Spanish': {code: 'es', langVoice: 'Conchita'},
  'French': {code: 'fr', langVoice: 'Mathieu'},
  'Japanese': {code: 'ja', langVoice: 'Mizuki'},
  'Portuguese': {code: 'pt', langVoice: 'Ricardo'},
  'Afrikaans': {code: 'af', langVoice: 'Joey'},
  'Swahili': {code: 'sw', langVoice: 'Joey'},
  'Russian': {code: 'ru', langVoice: 'Tatyana'}
}

const Translate = ({ fetchAudio }) => {

  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);
  const [outputText, setOutputText] = useState('')

  const [inputLang, setInputLang] = useState('English');
  const [toggledInput, setToggledInput] = useState(false);

  const [outputLang, setOutputLang] = useState('English');
  const [toggledOutput, setToggledOutput] = useState(false);

  const updateInputLangDropdown = name => {
    setToggledInput(false);
    setInputLang(name);
  }

  const updateOutputLangDropdown = name => {
    setToggledOutput(false);
    setOutputLang(name);
  }

  const synthesizeText = async(input, lang) => {
    let audio = await fetchAudio(input, languages[lang].langVoice);
    let audio1 = new Audio(`data:audio/ogg;base64,${audio}`);
    await audio1.play();
  }

  useEffect(() => {
    const fetchTranslation = async() => {
      let { data } = await axios.post('http://localhost:3001/translate', {
        input_lang: languages[inputLang].code,
        output_lang: languages[outputLang].code,
        original_text: debouncedText
      })
      setOutputText(data.translated_text);
    }

    if (debouncedText){
      fetchTranslation();
    } else {
      setOutputText('');
    }
  }, [debouncedText, inputLang, outputLang]);

  useEffect(() => {
    if (text && !debouncedText){
      setOutputText('Loading...');
    }

    const timeoutId = setTimeout(() => {
      setDebouncedText(text);
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [text, debouncedText]);

  return(
    <div className="translate-container">
      <div className="translate-text-container">
        <textarea 
          className="translate-text" 
          spellCheck="false"
          maxLength="744"
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={() => synthesizeText(text, inputLang)}
          className="translate-dropdown-button"
          style={{left: 5, bottom: 5}}
        >
          <i className="volume up icon"/>
        </button>
        <Dropdown 
          style={{
            parent: 'translate-dropdown-parent',
            button: 'translate-dropdown-button',
            menu: 'translate-dropdown-menu'
          }}
          option={inputLang}
          options={Object.keys(languages)}
          toggled={toggledInput}
          setOption={setInputLang}
          setToggled={setToggledInput}
          updateDropdown={updateInputLangDropdown}
          reverse
        />
      </div>
      <div className="translate-text-container">
        <div className="translate-text">
          {outputText}
        </div>
        <button
          className="translate-dropdown-button"
          style={{left: 5, bottom: 5}}
          onClick={() => synthesizeText(outputText, outputLang)}
        >
          <i className="volume up icon"/>
        </button>
        <Dropdown 
          style={{
            parent: 'translate-dropdown-parent',
            button: 'translate-dropdown-button',
            menu: 'translate-dropdown-menu'
          }}
          option={outputLang}
          options={Object.keys(languages)}
          toggled={toggledOutput}
          setOption={setOutputLang}
          setToggled={setToggledOutput}
          updateDropdown={updateOutputLangDropdown}
          reverse
        />
      </div>
    </div>
  );
};

export default Translate;
