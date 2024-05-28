import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import '../Styles/Rows.css';
import { createInvoiceLog, getUserById } from './APICalls';
import moment from 'moment';
import Cookies from 'js-cookie';
import DeletePopUp from './DeletePopUp';

const COOKIE_NAME = 'dataGridColumnVisibilitySettings';
const COOKIE_EXPIRATION_DAYS = 400;

const loadColumnVisibilitySettings = () => {
  const savedSettings = Cookies.get(COOKIE_NAME);
  return savedSettings ? JSON.parse(savedSettings) : {};
};

const saveColumnVisibilitySettings = (ColumnVisibilityModel) => {
  Cookies.set(COOKIE_NAME, JSON.stringify(ColumnVisibilityModel), { expires: COOKIE_EXPIRATION_DAYS });
};

export default function Table({ data, columns, handleUpdate, defaultSorting, handleDelete }) {
  const [user, setUser] = useState(null);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [rowSelectionModel, setRowSelectionModel] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(loadColumnVisibilitySettings() || {});
  const [showDeleteButton, setShowDeleteButton] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = window.sessionStorage.getItem("user");
      if (userId) {
        const user = await getUserById(userId);
        setUser(user);
        if (user.permission === 2) {
          setShowDeleteButton(false);
        }
      }
    };

    fetchUser();

    const savedColumnVisibilityModel = loadColumnVisibilitySettings();
    if (savedColumnVisibilityModel) {
      setColumnVisibilityModel(savedColumnVisibilityModel);
    }
  }, []);

  const handleCloseSnackbar = () => setSnackbarOpen(false);

  const handleSelectionModelChange = (newSelection) => {
    setRowSelectionModel(newSelection);
  };

  const processRowUpdate = async (updatedRow, oldValue) => {
    if (JSON.stringify(updatedRow) !== JSON.stringify(oldValue)) {
      if (updatedRow.qb_invoice !== oldValue.qb_invoice) {
        await createInvoiceLog({ job_id: updatedRow.id, date: moment.tz(new Date(), 'America/Edmonton').utc(), number: updatedRow.qb_invoice });
      }
      await handleUpdate(updatedRow.id, updatedRow);
      setSnackbarMessage('Row updated successfully');
      setSnackbarOpen(true);
    }
    return updatedRow;
  };

  const handleProcessRowUpdateError = (error) => {
    console.error('Error updating row:', error);
  };

  const getRowClassName = (params) => {
    const rowType = params.row.type;
    if(params.row.color != null){
      switch (params.row.color) {
        case 'Green':
          return 'green-row';
        case 'Orange':
          return 'orange-row';
        case 'Blue':
          return 'blue-row';
        default:
          return '';
      }
    }

    switch (rowType) {
      case 'Finished':
      case 'Cancelled':
      case 'Cancelled OS':
        return 'completed-row';
      case 'NPAT':
        return 'npat-row';
      default:
        return '';
    }
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
        <DeletePopUp
          style={{ position: 'absolute', top: '-40px', right: '10px' }} 
          open={deleteDialogOpen}
          setOpen={setDeleteDialogOpen}
          handleConfirm={(choice) => {
            if (choice) {
              handleDelete(rowSelectionModel);
            }
            setDeleteDialogOpen(false);
          }}
        />
      }
      <Box sx={{ height: '650px', width: '100%' }}>
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
          checkboxSelection={showDeleteButton} 
          disableRowSelectionOnClick
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newColumnVisibilityModel) => {
            setColumnVisibilityModel(newColumnVisibilityModel);
            saveColumnVisibilitySettings(newColumnVisibilityModel);
          }}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            handleSelectionModelChange(newRowSelectionModel);
            setRowSelectionModel(newRowSelectionModel);
          }}
        />
      </Box>
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: 'left' }} open={snackbarOpen} onClose={handleCloseSnackbar} message={snackbarMessage} autoHideDuration={2000} />
    </div>
  );
}
