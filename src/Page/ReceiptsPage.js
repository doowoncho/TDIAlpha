import FileUpload from "../Components/FileUploadGeneric";
import React, { useEffect, useState, useRef } from "react";
import { getReceipts, deleteReceipts } from "../Components/APICalls";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "bootstrap-icons/font/bootstrap-icons.css";
import { storage } from '../Components/Firebase';
import { ref, deleteObject } from 'firebase/storage';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Table from "../Components/Table";
import { useParams } from "react-router-dom";
import { TasksTableColumns } from "../Helpers/TableUtils";
import SwipeableEdgeDrawer from "../Components/Drawer";
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import FeedIcon from '@mui/icons-material/Feed';
import MapIcon from '@mui/icons-material/Map';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import JobDetails from "../Components/JobDetails";

export default function ReceiptsPage() {
  const [files, setFiles] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!isMounted.current) return; // Check if component is still mounted
        async function fetchFiles() {
          try {
            const fetchedFiles = await getReceipts();
            setFiles(fetchedFiles);
            console.log(fetchedFiles);
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

  return (
    <>
    <div className="container">
      <Paper elevation={3} className="mt-5 pb-3" style={{width: '70%', margin: '0 auto', textAlign: 'center'}}>
        <h6>Receipts</h6>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {files.map((fileItem, index) => (
            <div key={fileItem.id} style={{ width: '90%' }}>
              <Card variant="outlined" className="mb-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'3%', width:'90%', margin:'auto' }}>
                <p className='mb-1 py-2' style={{ textAlign: 'center' }}>
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
      </Paper>
      <div className="d-none d-sm-block">
        <Paper elevation={3} style={{width: '40%', margin: '0 auto', textAlign: 'center'}} className="my-4"> 
          <div className="d-flex flex-wrap" style={{ justifyContent:'center' }}>
            <div className="mx-2 mb-3">
              <label htmlFor="formFileDisabled" className="form-label my-1">Receipts</label>
              <FileUpload type="receipts"></FileUpload>
            </div>
          </div>
        </Paper>
      </div>
      <Paper elevation={3} style={{ width: '70%', margin: '0 auto', textAlign: 'center' }} className="my-4 d-block d-sm-none">
        <div className="d-flex flex-wrap" style={{ justifyContent: 'center' }}>
          <div className="mx-2 mb-3">
            <SwipeableEdgeDrawer type="receipts" label="Receipt"></SwipeableEdgeDrawer>
          </div>
        </div>
      </Paper>
      </div>
      {/* <div className="card d-block d-sm-none">
        <div className="card-header">
          Files
        </div>
        <div className="d-flex flex-wrap justify-content-center">
          <div className="mx-2 my-2">
            <SwipeableEdgeDrawer type="permitConfirmation" jobId={id} label="Receipts"></SwipeableEdgeDrawer>
          </div>
        </div>
      </div> */}
    </>
  );
}
