import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar'; // Import Snackbar from @mui/material
import moment from 'moment';
import { getRowIdFromRowModel } from '@mui/x-data-grid/internals';

export default function Table({ data, columns, handleUpdate }) {
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const processRowUpdate = async (updatedRow, oldValue) => {
      if(JSON.stringify(updatedRow) !== JSON.stringify(oldValue)){
        await handleUpdate(updatedRow.id, updatedRow);
        setSnackbarMessage('Row updated successfully');
        setSnackbarOpen(true);
      }
      return updatedRow
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
          disableColumnFilter
          density="comfortable"
          editMode="cell" // Set editMode to "row" to prevent cells from popping out after editing
        />
      </Box>
      <Snackbar open={snackbarOpen} onClose={handleCloseSnackbar} message={snackbarMessage} />
    </div>
  );
}
