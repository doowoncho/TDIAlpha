import { Dropdown } from 'react-bootstrap';
import { getUserById, getAllUsers, updatetask } from './APICalls';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

function renderTableCell({ property, column, handleUpdate, currentPath }) {
  const name = column.toLowerCase();

  if (name === 'id') {
    return  currentPath.includes('/taskspage') ? <a href={`/taskdetails/${property.id}`} className="no-link-style">{property.id}</a> : <a href={`/taskspage/${property.id}`} className="no-link-style">{property.id}</a>;
  } else if (name === 'assigned'){
      if(user.permission === 1){
        return <RenderAssignedDropdown property={property} handleUpdate={handleUpdate} />;
      }
      else{
        return property[name] ? users.filter(x => x.id == property[name])[0].name : 'Not Assigned';
      }
  }else if (name === 'starttime' || name === 'endtime') {
      return property[name] ? moment(property[name]).format('MMMM DD YYYY h:mmA') : "";
  } else if (name === 'status') {
    return (
      <Dropdown>
      <Dropdown.Toggle variant='white' id='dropdownMenuButton'>
        {property[name]}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'New' };
            handleUpdate(property.id, params);
          }}
        >
          New Request
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Waiting' };
            handleUpdate(property.id, params);
          }}
        >
          Waiting For Stamp
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Declined' };
            handleUpdate(property.id, params);
          }}
        >
          Declined
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Submitted' };
            handleUpdate(property.id, params);
          }}
        >
          Submitted
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Invoice' };
            handleUpdate(property.id, params);
          }}
        >
          Invoice
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Completed' };
            handleUpdate(property.id, params);
          }}
        >
          Completed
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Approved' };
            handleUpdate(property.id, params);
          }}
        >
          Approved
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    );
  } else {
    return property[name];
  }
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
    return 'bg-secondary text-light'; // Apply this class for condition1
  } 
  else if (property.type == "place") {
    return 'bg-success text-light'; // Apply this class for condition2
  } else if (property.type == "pickup") {
    return 'bg-warning text-dark'; // Apply this class for condition3
  }
  else if (property.type == "npat") {
    return 'text-primary'; // Apply this class for condition3
  }
  else{
    return ''; // Default class if none of the conditions match
  }
}

export default function Table({ data, displayColumns, handleUpdate, handleDelete }) {
 const location = useLocation();
 // Access the current pathname to determine the current page
 const currentPath = location.pathname;

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
  <div className='table-responsive-sm'>
    <table className='table table-hover'>
      <thead>
        <tr>
          {displayColumns.map((column) => (
            <th key={column}>
              {currentPath.includes('/taskspage') ? renderColumn(column) : column}
            </th>
          ))}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((property) => (
          <tr key={property.id}>
            {displayColumns.map((column) => (
              <td key={`${property.id}-${column}`} className={getColor(property)}>
                {renderTableCell({ property, column, handleUpdate, currentPath })}
              </td>
            ))}
            <td>
              <button className='my-1 btn btn-outline-danger' onClick={() => handleDelete(property.id)}>
                <i className="bi bi-trash"></i> Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}
