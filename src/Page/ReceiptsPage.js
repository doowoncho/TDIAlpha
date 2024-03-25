import FileUpload from "../Components/FileUploadGeneric";
import React, { useEffect, useState, useRef } from "react";
import { getReceipts, deleteReceipts } from "../Components/APICalls";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import "bootstrap-icons/font/bootstrap-icons.css";
import { storage } from '../Components/Firebase';
import { ref, deleteObject } from 'firebase/storage';
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

  useEffect(() => {
    const fetchData = async () => {
      try {

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
              <Paper elevation={3} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap:'3%' }}>
                <p className='mb-1 py-2' style={{ textAlign: 'center' }}>
                  <span>{index + 1}. </span>
                  <a href={fileItem.file} target="_blank" rel="noopener noreferrer">
                    {fileItem.name}
                  </a>
                </p>
                <Button variant="outlined" color="error" onClick={() => handleDelete(fileItem.name)}>
                  Delete
                </Button>
              </Paper>
            </div>
          ))}
          </div>
      </Paper>
      <div className="card d-none d-sm-block my-4" style={{width: '70%', margin: '0 auto'}}>
        <div className="card-header">
          Files
        </div>
        <div className="d-flex flex-wrap">
          <div className="mx-2 my-2">
            <label htmlFor="formFileDisabled" className="form-label my-1">Receipts</label>
            <FileUpload type="receipts"></FileUpload>
          </div>
        </div>
        </div>
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
