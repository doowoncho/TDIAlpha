// FileUpload.js

import React, { useState } from 'react';
import { storage } from '../Components/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { updateJob } from './APICalls';
import { useParams } from 'react-router-dom';

function FileUpload({type, job}) {
  const [file, setFile] = useState(null);
  const { id } = useParams();
  const [uploaded, setUploaded] = useState({
    "p_confirm": false,
    "permit": false,
    "map": false,
  })
  let fileBlob;
  const fileType = {
    "p_confirm": "bi bi-file-check",
    "permit": "bi bi-file-text",
    "map": "bi bi-map"
  }

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  async function handleUpload(){
    const fileRef = ref(storage, `${file.name}`);

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

      await updateJob(id, update);

      const updatedUploaded = { ...uploaded, [type.type]: true };

      setUploaded(updatedUploaded);
      console.log(uploaded[type.type]);

  }

  console.log(job);

  return (
    <>
      {job ? (
          <div className={`card border border-success  bg-light mb-2 `} style={{width:"16rem"}}>
            <div className="card-body">
              <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <a href={job}><i className={`${fileType[type]}`} style={{ fontSize: "2rem" }}></i></a>
              </div>
            </div>
          </div>
      ) : (
        <div className='card' style={{margin:"0"}}>
          <input type="file" onChange={handleFileChange}/>
          <button onClick={handleUpload}>Upload File</button>
        </div>
      )}
    </>
  );
}

export default FileUpload;
