import React, { useReducer } from 'react';
import axios from 'axios';
import DragAndDrop from './DragAndDrop';
import './SpeechToText.scss';

const SpeechToText = () => {
  const reducer = (state, action) => {
    switch(action.type){
      case 'SET_DROP_DEPTH':
        return { ...state, dropDepth: action.dropDepth };
      case 'SET_IN_DROP_ZONE':
        return { ...state, inDropZone: action.inDropZone };
      case 'ADD_FILE_TO_LIST':
        return { ...state, file: action.files[0] };
      default:
        return state;
    }
  };

  const [data, dispatch] = useReducer(reducer, { 
    dropDepth: 0,
    inDropZone: false,
    file:  null
  });

  const uploadFile = async() => {
    console.log(data);
    let curFile = new FormData();
    curFile.append("multipart/form-data", data.file);
    console.log(curFile);
    let response = await axios.post(
      'http://localhost:3001/upload', 
      curFile
    );
    console.log(response);
  };

  return(
    <div className="speechtext-container">
      <div className="speechtext-input-container">
        <DragAndDrop data={data} dispatch={dispatch}/>
      </div>
      <div className="textspeech-text-container">
        <div className="translate-text">
          <button onClick={uploadFile}>hello</button>
          {data.file ? data.file.name : ''}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
