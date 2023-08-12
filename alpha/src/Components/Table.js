import { Dropdown } from 'react-bootstrap';
import { updateJob } from './APICalls';

export default function Table({ data, CallBack, displayColumns, table }) {
  async function OnClick(id, params) {
    await updateJob(id, params);
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
      <div className='container my-4'>
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
                <td><a href={`/jobdetails/${property.id}`}>{property.id}</a></td>
                {displayColumns.map((column) => (
                  <td key={`${property.id}-${column}`}>
                  {property[column.toLowerCase()]}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}