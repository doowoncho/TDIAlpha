import { Alert, Dropdown } from 'react-bootstrap';
import { getUserById, getAllUsers, updatetask } from './APICalls';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { qbMath } from '../Helpers/TableUtils';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar, GridToolbarColumnsButton, GridToolbarExport } from '@mui/x-data-grid';
import { Snackbar } from '@mui/base';

const moment = require('moment');

let user = await getUserById(window.sessionStorage.getItem("user"));
let users = await getAllUsers();

function RenderAssignedDropdown({ property, handleUpdate }) {
  return (
    <Dropdown>
      <Dropdown.Toggle id='dropdownMenuButton'>
        {users.find(user => user.id === property.assigned)?.name || "No User Assigned"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {users.map((user) => (
          <Dropdown.Item
            key={user.id}
            onClick={() =>
              handleUpdate(property.id, { assigned: user.id })
            }
          >
            {user.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function QBInvoiceInput({ property, handleUpdate }) {
  return (
      <div className="input-group" style={{width:"150px"}}>
        <input type="text" className={`form-control ${property.id}`} placeholder={property.qb_invoice} />
        <div className="input-group-append">
          <button className="btn btn-outline-success" onClick={() => {
            const inputElement = document.querySelector(`.form-control[class*="${property.id}"]`);
            var invoiceValue =  parseInt(inputElement.value);
            handleUpdate(property.id, {qb_invoice: invoiceValue * 0.1 + invoiceValue});
            inputElement.value = ''
          }}>
            <i className="bi bi-check2-circle"></i>
          </button>
        </div>
      </div>
  );
}

function renderColumn(column) {
  if (column === "StartTime") {
    return 'Place';
  } else if (column === 'EndTime') {
    return 'Pickup';
  } else {
    return column;
  }
}

function getColor(property) {
  if (property.completed) {
    return 'bg-secondary text-light'; 
  }
  else if (property.type == "npat") {
    return 'text-primary'; 
  }
  else if (property.type == "place") {
    return 'bg-success text-light'; 
  } else if (property.type == "pickup") {
    return 'bg-warning text-dark'; 
  }
  else{
    return ''; 
  }
}

export default function Table({ data, columns, handleUpdate, handleDelete }) {
 const [snackbar, setSnackbar] = React.useState(null);
 const handleCloseSnackbar = () => setSnackbar(null);

const handleProcessRowUpdateError = React.useCallback((error) => {
}, []);

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
    <Box sx={{height:'500px', width: '100%' }}>
      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        sx={{
          boxShadow: 2,
          fontSize: 16
        }}
        processRowUpdate={(updatedRow) =>{
          handleUpdate(updatedRow.id, updatedRow)
          setSnackbar({ children: 'Changes successfully saved', severity: 'success' });
          }
        }
        onProcessRowUpdateError={handleProcessRowUpdateError}
        pageSizeOptions={[5]}
        // checkboxSelection
        disableColumnFilter
        editMode='row'
        density="comfortable"
      />
    </Box>
</div>
  );
}
