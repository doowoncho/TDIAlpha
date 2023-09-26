import { Dropdown } from 'react-bootstrap';
import { getUserById, getAllUsers, updateJob} from './APICalls';
import { useEffect, useState } from 'react';

let user = await getUserById(window.sessionStorage.getItem("user"))
let users = await getAllUsers()

function RenderAssignedDropdown({ property, handleJobUpdate }) {  
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
              handleJobUpdate(property.id, { assigned: user.id })
            }
          >
            {user.name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function renderTableCell({ property, column, handleJobUpdate}) {
  const name = column.toLowerCase();

  if (name === 'id') {
    return <a href={`/jobdetails/${property.id}`}>{property.id}</a>;
  } 
  else if (name === 'assigned' && user.permission == 1) {
    return <RenderAssignedDropdown property = {property} handleJobUpdate={handleJobUpdate}/>;
  }
  else if (name === 'assigned') {
    return users.filter(x => x.id == property[name])[0].name;
  }
  else if(name == 'status'){
    return <Dropdown>
    <Dropdown.Toggle variant='white' id='dropdownMenuButton'>
        {property[name]}
    </Dropdown.Toggle>
    <Dropdown.Menu>
      <Dropdown.Item
        onClick={() => {
          const params = { status: 'New' };
          handleJobUpdate(property.id, params)
        }}
      >
        New Request
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          const params = { status: 'Declined' };
          handleJobUpdate(property.id, params)
        }}
      >
        Declined
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          const params = { status: 'Completed' };
          handleJobUpdate(property.id, params);
        }}
      >
        Completed
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          const params = { status: 'Waiting' };
          handleJobUpdate(property.id, params);
        }}
      >
        Waiting For Stamp
      </Dropdown.Item>
      <Dropdown.Item
        onClick={() => {
          const params = { status: 'Invoice' };
          handleJobUpdate(property.id, params);
        }}
      >
        Invoice
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  }
  else {
    return property[name];
  }
}

export default function Table({ data, displayColumns, handleJobUpdate, handleJobDelete}) {
  if (!data) {
    return (
      <div>
        <div className='container my-4'>
          <table className='table table-hover'>
            <thead>
              <tr>
                {displayColumns.map((columnName) => (
                  <th key={columnName}>
                    {columnName}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>
        Can't Connect to Database
      </div>
    );
  }

  return (
    <div>
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
                     {renderTableCell({ property, column, handleJobUpdate })} 
                  </td>))}
                <td>  
                  <button className='my-1 btn btn-outline-danger' onClick={ ()=> { handleJobDelete(property.id) }}>
                    <i className="bi bi-trash"></i>
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