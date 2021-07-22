import React, {useState} from 'react';
import axios from 'axios';
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

  const fetchData = async() => {
    const { data } = await axios.get('http://localhost:3001/route2');
    console.log(data);
  };

  const mainComponent = () => {
    if (option === 'Translate'){
      return <Translate />;
    }
    if (option === 'Text-to-speech'){
      return <TextToSpeech />;
    }
    if (option === 'Image classifier'){
      return <ImageClassifier />;
    }
  };
  
  return (
    <div>
      <div className="title">
        <b>Pear.</b>
      </div>
      <div className="parent">
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
