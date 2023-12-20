// FileUpload.js

import React, { useState } from 'react';
import { storage } from '../Components/Firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { files, getFilesById, updateFiles, uploadFile } from './APICalls';
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

  async function handleDelete(id, type){
    let deleteFile
    if(type === "p_confirm"){
      deleteFile = {permit_confirmation_file: "", permit_confirmation_name: ""};
    }else if(type === "permit"){
      deleteFile = {permit_file: "", permit_name: ""};
    }else if(type === "map"){
      deleteFile = {map_file: "", map_drawing_name: ""};
    }else{
      deleteFile = {photo_file: "", photo_name: ""};
    }   
    files(id, deleteFile)
    window.location.reload()
  }
  
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
          <div className={`card border border-success bg-light mx-2`} style={{maxWidth:'300px'}}>
            <div className="card-body">
              <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <a href={task} target="_blank"><i className={`${fileType[type]}`} style={{ fontSize: "2rem" }}></i></a>
              </div>
              <div style={{display:"flex", flexDirection:"column"}}>
                  <input type="file" onChange={handleFileChange}/>
                  <button onClick={handleUpload}>Replace File</button>
                  <button className='btn btn-outline-danger mt-3' onClick={()=>handleDelete(id, type)}>Delete File</button>
              </div>
            </div>
          </div>
      ) : (
          <div className='card mx-2' style={{maxWidth:'300px'}}>
            <div className="card-body">
              <input type="file" onChange={handleFileChange}/>
              <button className='my-2' onClick={handleUpload}>Upload File</button>
            </div>
          </div>
      )}
    </>
  );
}

export default FileUpload;
