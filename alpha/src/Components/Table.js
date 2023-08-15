import { Dropdown } from 'react-bootstrap';
import { deleteJob, updateJob, getUserById} from './APICalls';

function renderTableCell(property, column) {
  
  const name = column.toLowerCase();

  if (name === 'id') {
    return <a href={`/jobdetails/${property.id}`}>{property.id}</a>;
  } 
  else if(name === 'assigned'){
    return 'doowon'
  }
  else {
    return property[name];
  }
}

export default function Table({ data, CallBack, displayColumns }) {
  async function OnClick(id, params) {
    await updateJob(id, params);
    CallBack();
  }

  async function Delete(id){
    await deleteJob(id)
    CallBack();
  }

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
                    {renderTableCell(property,column)}   
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
                          OnClick(property.id, params);
                        }}
                      >
                        New Request
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          const params = { status: 'Declined' };
                          OnClick(property.id, params);
                        }}
                      >
                        Declined
                      </Dropdown.Item>
                      <Dropdown.Item
                        onClick={() => {
                          const params = { status: 'Completed' };
                          OnClick(property.id, params);
                        }}
                      >
                        Completed
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </td>
                <td>  
                  <button className='my-1 btn btn-outline-danger' onClick={ ()=> { Delete(property.id) }}>
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