import React, { useState, useEffect } from 'react';
import { storage } from '../Components/Firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { files, getFilesById, uploadPhoto, uploadPermitCon, uploadPermit, uploadPlan, deleteFile } from './APICalls';
import { CircularProgress, Paper } from '@mui/material';
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
import DeletePopUp from './DeletePopUp'; // Import the DeletePopUp component

function FileUpload({ type, giveID, files }) {
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false); // State for delete confirmation popup
  const id = giveID;
  const [filesData, setFilesData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setFilesData(files[type] || []);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, [id, type]);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  async function handleDelete(filename){
    await deleteFile({filename});
    const fileDelete = ref(storage, `${filename}`);
    await deleteObject(fileDelete);
    window.location.reload();
  }

  async function handleUpload() {
    setLoading(true);
    const fileRef = ref(storage, `${file.name}`);
    
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(ref(storage, `${file.name}`));
    const fileBlob = url;

    const id_int = parseInt(giveID);
    const update = {
      job_id: id_int,
      name: file.name,
      file: fileBlob
    };

    // Handle different types of uploads
    switch (type) {
      case "permitConfirmation":
        await uploadPermitCon(update);
        break;
      case "permit":
        await uploadPermit(update);
        break;
      case "plan":
        await uploadPlan(update);
        break;
      default:
        await uploadPhoto(update);
    }

    setLoading(false);
    window.location.reload(); // Reload the page (consider better UX)
  }

  const handleDeleteConfirmation = async (choice, filename) => {
    console.log(choice);
    if (choice === true) {
      await handleDelete(filename);
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          {filesData && filesData.length > 0 ? (
            <div className={`card border border-success bg-light mx-2`} style={{ maxWidth: '300px' }}>
              <Paper elevation={3} >
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
                  <ListItem>
                    <label htmlFor="upload-file">
                      <input
                        type="file"
                        id="upload-file"
                        onChange={handleFileChange}
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
                    onChange={handleFileChange}
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
      )}
    </>
  );
}

export default FileUpload;
