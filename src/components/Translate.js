import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Translate.scss';
import Dropdown from './Dropdown';

const languages = {
  'English': 'en',
  'Spanish': 'es',
  'French': 'fr',
  'Japanese': 'ja',
  'Portuguese': 'pt',
  'Afrikaans': 'af',
  'Swahili': 'sw',
  'Russian': 'ru'
}

const Translate = ({ fetchAudio }) => {

  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState(text);
  const [outputText, setOutputText] = useState('')

  const [inputLang, setInputLang] = useState('English');
  const [toggledInput, setToggledInput] = useState(false);

  const [outputLang, setOutputLang] = useState('English');
  const [toggledOutput, setToggledOutput] = useState(false);
  const [transAudio, setTransAudio] = useState('');
  
  let audio1 = new Audio(`data:audio/mp3;base64,${transAudio}`);


  const updateInputLangDropdown = name => {
    setToggledInput(false);
    setInputLang(name);
  }

  const updateOutputLangDropdown = name => {
    setToggledOutput(false);
    setOutputLang(name);
  }

  const synthesizeText = (input) => {
    fetchAudio(input, 'Joey', setTransAudio);
    console.log(transAudio);
    audio1.play();
  }

  useEffect(() => {
    const fetchTranslation = async() => {
      let { data } = await axios.post('http://localhost:3001/translate', {
        input_lang: languages[inputLang],
        output_lang: languages[outputLang],
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
    }, 1000);
    
    return () => clearTimeout(timeoutId);
  }, [text, debouncedText]);

  return(
    <div className="translate-container">
      <div className="translate-text-container">
        <textarea 
          className="translate-text" 
          //spellCheck="false"
          maxLength="806"
          onChange={e => setText(e.target.value)}
        />
        <button
          onClick={() => synthesizeText(text)}
          className="translate-dropdown-button"
          style={{left: 0, bottom: 0}}
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
          style={{left: 0, bottom: 0}}
          onClick={() => synthesizeText(outputText)}
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
      {transAudio ? <audio id="audio1" preload="none" src={`data:audio/mp3;base64,${transAudio}`} autoPlay="autoplay" /> : ''}
    </div>
  );
};

export default Translate;
