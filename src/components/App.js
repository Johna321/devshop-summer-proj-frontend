import React, {useState} from 'react';
import axios from 'axios';
import './App.scss';
import Dropdown from './Dropdown';
import Translate from './Translate';
import TextToSpeech from './TextToSpeech';
import SpeechToText from './SpeechToText';
import ImageClassifier from './ImageClassifier';

const App = () => {
  const [toggled, setToggled] = useState(false);
  const [option, setOption] = useState('Translate')
  
  const updateDropdown = async(name) => {
    setToggled(false);
    setOption(name);
    
  };

  const fetchAudio = async(text, voice) => {
    if (text){
      const { data } = await axios.post('http://localhost:3001/tts', {
        text: text,
        voice_id: voice
      });
      return data.base64;
    }
  }

  const mainComponent = () => {
    switch(option){
      case 'Translate':
        return <Translate fetchAudio={fetchAudio}/>;
      case 'Text-to-speech':
        return <TextToSpeech fetchAudio={fetchAudio}/>;
      case 'Speech-to-text':
        return <SpeechToText />;
      case 'Image classifier':
        return <ImageClassifier />;
      default:
        return <h1>Error</h1>
    }
  };
  
  return (
    <div>
      <div className="parent">
        <div className="title">
          Tree
        </div>
        <div className="main-box">
          <Dropdown 
            style={{
              parent: 'dropdown-parent',
              button: 'dropdown-button',
              menu: 'dropdown-menu'
            }}
            icon
            option={option} 
            options={['Translate', 'Text-to-speech', 'Speech-to-text', 'Image classifier']}
            toggled={toggled}
            setOption={setOption}
            setToggled={setToggled}
            updateDropdown={updateDropdown}
          /> 
          <div className="content-container">
            {mainComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
