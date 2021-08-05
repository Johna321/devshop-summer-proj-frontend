import React, { useState } from 'react';
import './TextToSpeech.scss';
import Dropdown from './Dropdown';

const voices = [
  'Joey',
  'Brian',
  'Joanna',
  'Emma',
  'Zeina',
  'Giorgio',
  'Conchita',
  'Chantal',
  'Mia',
  'Hans',
  'Jan',
  'Mathieu',
  'Matthew',
  'Ricardo',
  'Tatyana',
  'Russell'
]

const TextToSpeech = ({ fetchAudio }) => {
  const [audio, setAudio] = useState('');
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [voice, setVoice] = useState('Joey');
  const [toggled, setToggled] = useState(false);

  const updateVoiceDropdown = voice => {
    setToggled(false);
    setVoice(voice);
  }

  return(
    <div className="textspeech-container">
      <div className="textspeech-text-container">
        {error ? 
          <div className="error">Must have input text!</div>
          :
          ''
        }
        <Dropdown 
          style={{
            parent: 'translate-dropdown-parent',
            button: 'translate-dropdown-button',
            menu: 'translate-dropdown-menu'
          }}
          option={voice}
          options={voices}
          toggled={toggled}
          setOption={setVoice}
          setToggled={setToggled}
          updateDropdown={updateVoiceDropdown}
          reverse
        />
        <textarea 
          className="translate-text"
          onChange={(e) => setText(e.target.value)}
          spellCheck="false"
        />
      </div>
      <div className="textspeech-speech-container">
        <button 
          className="textspeech-button"
          onClick={async() => {
            let response = await fetchAudio(text, voice);
            setAudio(response);
            if (!text){
              setError(true);
              setTimeout(() => {setError(false)}, 2500);
            }
          }}
        >
          <i className="volume up icon"/>
        </button>
        {audio ?  
          <audio src={`data:audio/mp3;base64,${audio}`} controls />
          :
          ''}
      </div>
    </div>
  );
};

export default TextToSpeech;

