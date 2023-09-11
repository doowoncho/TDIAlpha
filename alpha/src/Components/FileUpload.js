// FileUpload.js

import React, { useState } from 'react';
import { storage } from '../Components/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateJob } from './APICalls';
import { useParams } from 'react-router-dom';

function FileUpload(type) {
  const [file, setFile] = useState(null);
  const { id } = useParams();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  async function handleUpload(){
    const fileRef = ref(storage, `${file.name}`);
    let fileBlob;

    await uploadBytes(fileRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
    
    await getDownloadURL(ref(storage, `${file.name}`))
      .then((url) => {
        // `url` is the download URL for 'images/stars.jpg'
        fileBlob = url
      })

      let update = {};

      if(type.type === "p_confirm"){
        update = {p_confirm: fileBlob};
      }else if(type.type === "permit"){
        update = {permit: fileBlob};
      }else{
        update = {map: fileBlob};
      }

      console.log(type);

      updateJob(id, update);

  }

  return (
    <div className='card' style={{margin:"0"}}>
      <input type="file" onChange={handleFileChange}/>
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
}

export default FileUpload;
