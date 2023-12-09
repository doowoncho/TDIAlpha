// FileUpload.js

import React, { useState } from 'react';
import { storage } from '../Components/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { files, getFilesById } from './APICalls';
import { useParams } from 'react-router-dom';

function FileUpload({type, task, name}) {
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
  let newFileBlob;
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
        update = {permit_confirmation_file: fileBlob, permit_confirmation_name: file.name};
      }else if(type === "permit"){
        update = {permit_file: fileBlob, permit_name: file.name};
      }else if(type === "map"){
        update = {map_file: fileBlob, map_drawing_name: file.name};
      }else{
        update = {photo_file: fileBlob, photo_name: file.name};
      }
      
      await files(id, update);
      
      const updatedUploaded = { ...uploaded, [type]: true };
      const updatedFileName = { ...fileName };

      
      setUploaded(updatedUploaded);
      setFileName(updatedFileName)

      window.location.reload()
  }

  return (
    <>
      {task ? (
          <div className={`card border border-success  bg-light mb-2 `} style={{width:"16rem"}}>
            <div className="card-body">
              <p className='text-center'>{name}</p>
              <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <a href={task} target="_blank"><i className={`${fileType[type]}`} style={{ fontSize: "2rem" }}></i></a>
              </div>
                  <input type="file" onChange={handleFileChange}/>
                  <button onClick={handleUpload} style={{width:"100%"}}>Replace File</button>
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
