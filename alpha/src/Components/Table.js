import { Dropdown } from 'react-bootstrap';
import { getUserById, getAllUsers, updateJob} from './APICalls';
import { useEffect, useState } from 'react';
import JobsTable from '../Page/JobsTable';

function RenderAssignedDropdown({ property, handleJobUpdate }) {
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    getAllUsers()
      .then(users => {
        setUsers(users);
      })
      .catch(error => {
        console.error("Error fetching users:", error);
      });
  }, []);
  
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
  else if (name === 'assigned') {
    return <RenderAssignedDropdown property = {property} handleJobUpdate={handleJobUpdate}/>;
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
                  <Dropdown>
                    <Dropdown.Toggle variant='white' id='dropdownMenuButton'>
                      <i className='bi bi-three-dots-vertical'></i>
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
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
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