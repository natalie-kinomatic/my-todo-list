import React, { useState } from 'react';
import './App.css';
import STLDisplay from './components/STLDisplay';
import FileUpload from './components/FileUpload';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';

function App() {
  const [geometries, setGeometries] = useState([]);

  const handleFileUpload = (files) => {
    const loader = new STLLoader();
    const newGeometries = [];

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        const geometry = loader.parse(arrayBuffer);
        newGeometries.push(geometry);
        setGeometries([...newGeometries]);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  return (
    <div className="app">
      <div className="file-upload-section">
        <h1>Upload STL Files</h1>
        <FileUpload onFileUpload={handleFileUpload} />
      </div>
      <div className="three-scene">
        <STLDisplay geometries={geometries} />
      </div>
    </div>
  );
}

export default App;
