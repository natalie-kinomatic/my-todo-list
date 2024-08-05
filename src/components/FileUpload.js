import React, { useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = () => {
    if (files.length > 0) {
      onFileUpload(files);
    }
  };

  return (
    <div className="file-upload">
      <input type="file" accept=".stl" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
