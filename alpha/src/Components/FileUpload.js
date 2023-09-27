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
  const [fileName, setFileName] = useState({
    "p_confirm": "",
    "permit": "",
    "map": "",
    "photo": ""
  })
  let fileBlob;
  const fileType = {
    "p_confirm": "bi bi-file-check",
    "permit": "bi bi-file-text",
    "map": "bi bi-map",
    "photo": "bi bi-image"
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
      
      if(type === "p_confirm"){
        update = {p_confirm: fileBlob};
      }else if(type === "permit"){
        update = {permit: fileBlob};
      }else if(type === "map"){
        update = {map: fileBlob};
      }else{
        update = {photo: fileBlob};
      }
      
      await updateJob(id, update);
      
      const updatedUploaded = { ...uploaded, [type]: true };
      const updatedFileName = { ...fileName };

      // Update the specific property in the copy
  
      // Update the state with the modified copy
      setFileName(updatedFileName);
      
      setUploaded(updatedUploaded);

      console.log(`${file.name}`);
      console.log(updatedFileName);

  }

  async function handleReplace(){
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

      if(type === "p_confirm"){
        update = {p_confirm: fileBlob};
      }else if(type === "permit"){
        update = {permit: fileBlob};
      }else if(type === "map"){
        update = {map: fileBlob};
      }else{
        update = {photo: fileBlob};
      }

      await updateJob(id, update);

      const updatedUploaded = { ...uploaded, [type]: true };

      setUploaded(updatedUploaded);
  }

  return (
    <>
      {job ? (
          <div className={`card border border-success  bg-light mb-2 `} style={{width:"16rem"}}>
            <div className="card-body">
              <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <a href={job}><i className={`${fileType[type]}`} style={{ fontSize: "2rem" }}></i></a>
              </div>
                  <input type="file" onChange={handleFileChange}/>
                  <button onClick={handleReplace} style={{width:"100%"}}>Replace File</button>
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
