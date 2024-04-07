import FileUpload from "../Components/FileUploadGeneric";
import React, { useEffect, useState, useRef } from "react";
import { getReceipts, deleteReceipts } from "../Components/APICalls";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "bootstrap-icons/font/bootstrap-icons.css";
import { storage } from '../Components/Firebase';
import { ref, deleteObject } from 'firebase/storage';
import Card from '@mui/material/Card';
import SwipeableEdgeDrawer from "../Components/Drawer";
import { CircularProgress } from "@mui/material";

export default function ReceiptsPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted.current) return; // Check if component is still mounted
        async function fetchFiles() {
          try {
            const fetchedFiles = await getReceipts();
            setFiles(fetchedFiles);
            setLoading(false)
          } catch (error) {
            console.error(error);
          }
        }
        fetchFiles();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
  };
    fetchData();
    return () => {
      isMounted.current = false;
    }
    
  }, []);

  async function handleDelete(filename){
    console.log(filename);
    await deleteReceipts({filename});
    const fileDelete = ref(storage, `${filename}`);
    await deleteObject(fileDelete);
    window.location.reload();
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center' }}>
          <CircularProgress />
        </div>
    );
  }

  return (
    <>
    <div className="container">
      <Paper elevation={2} className="mt-5 pb-3" style={{width: '70%', margin: '0 auto', textAlign: 'center'}}>
        <h6>Receipts</h6>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {files.map((fileItem, index) => (
            <div key={fileItem.id} style={{width: '70%'}}>
              <Card variant="outlined" className="mb-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'3%', width:'100%', margin:'auto', padding: '10px'}}>
                <p className='mb-1 py-2' style={{ textAlign: 'left' }}>
                  <span>{index + 1}. </span>
                  <a href={fileItem.file} target="_blank" rel="noopener noreferrer">
                    {fileItem.name}
                  </a>
                </p>
                <Button variant="outlined" color="error" onClick={() => handleDelete(fileItem.name)}>
                  Delete
                </Button>
              </Card>
            </div>
          ))}
          </div>
      <div className="d-sm-block">
        <div style={{width: '90%', margin: '0 auto', textAlign: 'center'}} className="my-4"> 
          <div className="d-flex flex-wrap" style={{ justifyContent:'center' }}>
            <div className="mx-2 mb-3">
              <FileUpload type="receipts"></FileUpload>
            </div>
          </div>
        </div>
      </div>
      </Paper>
      </div>
    </>
  );
}
