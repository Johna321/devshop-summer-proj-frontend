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
          Tree
        </div>
        <div className="main-box">
          <Dropdown 
            option={option} 
            options={['Translate', 'Text-to-speech', 'Image classifier']}
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
