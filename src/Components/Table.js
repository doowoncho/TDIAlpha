import { Dropdown } from 'react-bootstrap';
import { getUserById, getAllUsers, updatetask } from './APICalls';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const moment = require('moment');

let user = await getUserById(window.sessionStorage.getItem("user"));
let users = await getAllUsers();

function RenderAssignedDropdown({ property, handletaskUpdate }) {
  return (
    <Dropdown>
      <Dropdown.Toggle variant='white' id='dropdownMenuButton'>
        {users.find(user => user.id === property.assigned)?.name || "No User Assigned"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {users.map((user) => (
          <Dropdown.Item
            key={user.id}
            onClick={() =>
              handletaskUpdate(property.id, { assigned: user.id })
            }
          >
            {user.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function renderTableCell({ property, column, handletaskUpdate, currentPath }) {
  const name = column.toLowerCase();

  if (name === 'id') {
    return  currentPath.includes('/taskspage') ? <a href={`/taskdetails/${property.id}`}>{property.id}</a> : <a href={`/taskspage/${property.id}`}>{property.id}</a>;
  } else if (name === 'assigned' && user.permission === 1) {
    return <RenderAssignedDropdown property={property} handletaskUpdate={handletaskUpdate} />;
  } else if (name === 'assigned') {
    if (property[name] == null) {
      return 'Not Assigned';
    }
    return users.filter(x => x.id == property[name])[0].name;
  } else if (name === 'starttime' || name === 'endtime') {
    if (property[name]) {
      return moment(property[name]).format('MMMM DD YYYY h:mmA');
    }
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
            handletaskUpdate(property.id, params);
          }}
        >
          New Request
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Waiting' };
            handletaskUpdate(property.id, params);
          }}
        >
          Waiting For Stamp
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Declined' };
            handletaskUpdate(property.id, params);
          }}
        >
          Declined
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Submitted' };
            handletaskUpdate(property.id, params);
          }}
        >
          Submitted
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Invoice' };
            handletaskUpdate(property.id, params);
          }}
        >
          Invoice
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            const params = { status: 'Completed' };
            handletaskUpdate(property.id, params);
          }}
        >
          Completed
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    );
  } else if (name === 'npat') {
    return (
      <>
        <input className="form-check-input mx-2" type="checkbox" value={property[name]} disabled />
      </>
    );
  } else {
    return property[name];
  }
}

export default function Table({ data, displayColumns, handletaskUpdate, handletaskDelete }) {
 const location = useLocation();
 // Access the current pathname to determine the current page
 const currentPath = location.pathname;

  if (!data) {
    return (
      <div>
        <div className='container my-4'>
          <div className='alert alert-danger' role='alert'>
            Can't Connect to Database
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='container my-3'>
        <table className='table table-hover'>
          <thead>
            <tr>
              {displayColumns.map((column) => (
                <th key={column}>
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((property) => (
              <tr key={property.id}>
                {displayColumns.map((column) => (
                  <td key={`${property.id}-${column}`}>
                    {renderTableCell({ property, column, handletaskUpdate, currentPath })}
                  </td>
                ))}
                <td>
                  <button className='my-1 btn btn-outline-danger' onClick={() => { handletaskDelete(property.id) }}>
                    <i className="bi bi-trash"></i> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  );
}
