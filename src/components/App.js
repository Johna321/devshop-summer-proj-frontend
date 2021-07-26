import React, {useState} from 'react';
import './App.scss';
import Dropdown from './Dropdown';
import Translate from './Translate';
import TextToSpeech from './TextToSpeech';
import ImageClassifier from './ImageClassifier';

const App = () => {
  const [toggled, setToggled] = useState(false);
  const [option, setOption] = useState('Translate')
  
  const updateDropdown = (name) => {
    setToggled(false);
    setOption(name);
  };

  const mainComponent = () => {
    switch(option){
      case 'Translate':
        return <Translate />;
      case 'Text-to-speech':
        return <TextToSpeech />;
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
          Pear.
        </div>
        <div className="main-box">
          <Dropdown 
            option={option} 
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
