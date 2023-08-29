// FileUpload.js

import React, { useState } from 'react';
import { storage } from '../Components/Firebase';
import { ref, uploadBytes } from 'firebase/storage';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  function handleUpload(){
    const fileRef = ref(storage, `${file.name}`);

    uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
  }

  return (
    <div className='card' style={{margin:"0"}}>
      <input type="file" onChange={handleFileChange}/>
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;
