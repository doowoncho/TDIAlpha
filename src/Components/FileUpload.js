// FileUpload.js

import React, { useState, useEffect } from 'react';
import { storage } from '../Components/Firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { files, getFilesById, uploadPhoto, uploadPermitCon, uploadPermit, uploadPlan, deleteFile } from './APICalls';
import { Paper } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from 'react-bootstrap/Button';

function FileUpload({type, giveID}) {
  const [file, setFile] = useState(null);
  const id = giveID;
  const [filesData, setFilesData] = useState(null);
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

  const fetchData = async () => {
    try {
      const response = await getFilesById(id);
      setFilesData(response[type] || []);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  // Call the fetchData function when the component mounts or when id changes
  useEffect(() => {
    fetchData();
  }, [id, type]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  async function handleDelete(filename){
    console.log(filename);
    await deleteFile({filename});
    const fileDelete = ref(storage, `${filename}`);
    await deleteObject(fileDelete);
    window.location.reload();

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
    
    let id_int = parseInt(giveID);
      let update = {
        job_id: id_int,
        name: file.name,
        file: fileBlob
      };
      if(type === "permitConfirmation"){
        console.log(update);
        await uploadPermitCon(update);
      }else if(type === "permit"){
        await uploadPermit(update);
      }else if(type === "plan"){
        await uploadPlan(update);
      }else{
        await uploadPhoto(update);
      }

      // await files(id, update);
      
      const updatedUploaded = { ...uploaded, [type]: true };
      const updatedFileName = { ...fileName };
      
      setUploaded(updatedUploaded);
      setFileName(updatedFileName);

      // window.location.reload();
  }

  return (
    <>
    {filesData && filesData.length > 0 ? (
      <div className={`card border border-success bg-light mx-2`} style={{ maxWidth: '300px' }}>
        <Paper elevation={3} >
          {/* <div className="card-body">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filesData.map((fileItem) => (
                <div key={fileItem.id}>
                  <p className='mb-1'>
                    <a href={fileItem.file} target="_blank" rel="noopener noreferrer">
                      {fileItem.name}
                    </a>
                  </p>
                  <button className='btn btn-outline-danger mb-2' onClick={() => handleDelete(fileItem.name)}>
                    Delete File
                  </button>
                </div>
              ))}
              <input type="file" onChange={handleFileChange} className='mt-3'/>
              <button className='my-2' onClick={handleUpload}>
                Upload File
              </button>
            </div>
          </div> */}
          <List>
            {filesData.map((fileItem) => (
              <ListItem key={fileItem.id} style={{ width: '300px' }}>
                <ListItemIcon>
                  <FolderIcon />
                </ListItemIcon>
                <ListItemText
                  primary={<a href={fileItem.file} target="_blank" rel="noopener noreferrer">{fileItem.name}</a>}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(fileItem.name)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
            {/* File Input and Upload Button */}
            <ListItem>
              <label htmlFor="upload-file">
                <input
                  type="file"
                  id="upload-file"
                  onChange={handleFileChange} // Hide the input visually
                />
                <div style={{ textAlign: 'center' }} className='d-flex justify-content-center align-items-center mt-2'>
                  <Button variant="dark" component="span" onClick={handleUpload}>
                    Upload File
                  </Button>
                </div>
              </label>
            </ListItem>
          </List>
        </Paper>
      </div>
    ) : (
      <div className='card mx-2' style={{ maxWidth: '300px' }}>
          <div className="card-body">
            <label htmlFor="upload-file">
              <input
                type="file"
                id="upload-file"
                onChange={handleFileChange} // Hide the input visually
              />
              <div style={{ textAlign: 'center' }} className='d-flex justify-content-center align-items-center mt-2'>
                <Button variant="dark" component="span" onClick={handleUpload}>
                  Upload File
                </Button>
              </div>
            </label>
          </div>
      </div>
    )}
  </>
  );
}

export default FileUpload;
