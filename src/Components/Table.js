import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridDeleteForeverIcon, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar from @mui/material

import '../Styles/Rows.css'
import { createInvoiceLog, deleteJob } from './APICalls';
import moment from 'moment';
import { Button } from 'react-bootstrap';

export default function Table({ data, columns, handleUpdate, defaultSorting, handleDelete, showDeleteButton = true}) {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleSelectionModelChange = async (newSelection) => {
    console.log(newSelection)
    setRowSelectionModel(newSelection)
    // Do something with the selected rows...
  };

  const processRowUpdate = async (updatedRow, oldValue) => {
      if(JSON.stringify(updatedRow) !== JSON.stringify(oldValue)){
        if(updatedRow.qb_invoice!= oldValue.qb_invoice){
            await createInvoiceLog({job_id: updatedRow.id, date: moment.tz(new Date(), 'America/Edmonton').utc(), number: updatedRow.qb_invoice})
        }
        await handleUpdate(updatedRow.id, updatedRow);
        setSnackbarMessage('Row updated successfully');
        setSnackbarOpen(true);
      }
      return updatedRow
  };

  const getRowClassName = (params) => {
    const rowType = params.row.type; // Change 'status' to the field you want to base the color on

    if(rowType =='Finished' || rowType == 'Cancelled' || rowType == 'Cancelled OS'){
      return 'completed-row'; 
    }

    switch (rowType) {
      // case 'place':
      //   return 'place-row'; // Define CSS class for pending rows
      case 'NPAT':
        return 'npat-row'; // Define CSS class for completed rows
      default:
        return ''; // Default class for other rows
    }
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Error updating row:', error);
  };

  if (!data) {
    return (
      <div>
        <div className='container my-4'>
          <div className='alert' role='alert'>
            ...Loading
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='container my-3' style={{ position: 'relative' }}>
  {rowSelectionModel.length > 0 && 
    <Button 
      variant="outlined" 
      style={{ position: 'absolute', top: '-40px', right: '10px' }} // Adjust top and right as needed
      onClick={() => rowSelectionModel.forEach(element => {
        handleDelete(element);
      })}
    >
      <GridDeleteForeverIcon />
    </Button>
  }
  <Box sx={{ height: '500px', width: '100%' }}>
    <DataGrid
      slots={{ toolbar: GridToolbar }}
      rows={data}
      columns={columns}
      pageSize={5}
      processRowUpdate={processRowUpdate}
      onProcessRowUpdateError={handleProcessRowUpdateError}
      density="comfortable"
      editMode="cell"
      getRowClassName={getRowClassName}
      timezone="America/Edmonton"
      initialState={defaultSorting}
      checkboxSelection = {showDeleteButton} 
      disableRowSelectionOnClick
      onRowSelectionModelChange={(newRowSelectionModel) => {
        handleSelectionModelChange(newRowSelectionModel)
        setRowSelectionModel(newRowSelectionModel);
      }}
    />
  </Box>
  <Snackbar anchorOrigin={{ vertical: "top", horizontal: 'left' }} open={snackbarOpen} onClose={handleCloseSnackbar} message={snackbarMessage} autoHideDuration={2000} />
</div>

  );
}
