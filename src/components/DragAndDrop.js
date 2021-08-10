import React from 'react';
import './DragAndDrop.scss';

const DragAndDrop = ({ data, dispatch }) => {

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    let files = [...e.dataTransfer.files];
    console.log(files);
    if (files && files.length > 0){
      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      e.dataTransfer.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    }
  };

  const handleFileInput = e => {
    let files = [...e.target.files];
    if (files && files.length > 0){
      dispatch({ type: 'ADD_FILE_TO_LIST', files });
    }
  };

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleDragEnter = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 });
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });
    if (data.dropDepth > 0) return;
    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
  };

  return(
    <div 
      className="drag-drop-zone"
      onDrop={e => handleDrop(e)}
      onDragOver={e => handleDragOver(e)}
      onDragEnter={e => handleDragEnter(e)}
      onDragLeave={e => handleDragLeave(e)}
    >
      <input type="file" id="file-input" style={{ display: 'none' }} onChange={handleFileInput} />
      <label htmlFor="file-input" className="file-input-label">
        {data.file ? data.file.name : 'upload'}
      </label>
    </div>
  );
};

export default DragAndDrop;
