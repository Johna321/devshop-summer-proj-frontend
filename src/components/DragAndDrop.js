import React, { useState } from 'react';
import './DragAndDrop.scss';

const DragAndDrop = ({ data, dispatch }) => {

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();

    let files = [...e.target.files];
    if (files && files.length > 0){
      const existingFiles = data.fileList.map(f => f.name);
      //files = files.filter(f => !existingFiles.includes(f.name));
      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      //e.target.clearData();
      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
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
      <input type="file" onChange={handleDrop} className="drag-drop-file-input" />
      Drag speech here 

    </div>
  );
};

export default DragAndDrop;
