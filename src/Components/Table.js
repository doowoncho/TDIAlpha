import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar from @mui/material

import '../Styles/Rows.css'
import { createPermitCostLog } from './APICalls';

export default function Table({ data, columns, handleUpdate }) {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleDelete = () =>{
    setSnackbarMessage('Row updated successfully');
  }

  const processRowUpdate = async (updatedRow, oldValue) => {
      if(JSON.stringify(updatedRow) !== JSON.stringify(oldValue)){
        if(updatedRow.permit_cost != oldValue.permit_cost){
            await createPermitCostLog({job_id: updatedRow.id, date: new Date(), cost: updatedRow.permit_cost})
        }
        await handleUpdate(updatedRow.id, updatedRow);
        setSnackbarMessage('Row updated successfully');
        setSnackbarOpen(true);
      }
      return updatedRow
  };

  const getRowClassName = (params) => {
    const isComplete = params.row.completed
    const rowType = params.row.type; // Change 'status' to the field you want to base the color on

    if(isComplete || rowType == 'Cancelled' || rowType == 'Cancelled OS'){
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
    <div className='container my-3'>
      <Box sx={{ height: '500px', width: '100%' }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={data}
          columns={columns}
          pageSize={5}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
          // disableColumnFilter
          density="comfortable"
          editMode="cell" // Set editMode to "row" to prevent cells from popping out after editing
          getRowClassName={getRowClassName} //
          sx={{
            '& .MuiDataGrid-cell:hover': {
              color: 'primary.main',
            }
          }} 
        />
      </Box>
      <Snackbar open={snackbarOpen} onClose={handleCloseSnackbar} message={snackbarMessage} />
    </div>
  );
}
