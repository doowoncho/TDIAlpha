import { Dropdown } from 'react-bootstrap';
import { updateJob } from './APICalls';

export default function Table({ data }) {

  if (!data) {
    return <div><div className='container my-4'>
     <table id='table' className='table table-hover'>
            <thead>
              <tr>
                <th scope='col' className='fw-normal bg-'>
                  ID
                </th>
                <th scope='col' className='fw-normal'>
                  Start Date
                </th>
                <th scope='col' className='fw-normal'>
                  Status
                </th>
                <th scope='col' className='fw-normal'>
                  Setup
                </th>
                <th scope='col' className='fw-normal'>
                  Customer
                </th>
                <th scope='col' className='fw-normal'>
                  Permit/Request#
                </th>
                <th scope='col' className='fw-normal'>
                  Notes
                </th>
                <th scope='col' className='fw-normal'>
                  WO#
                </th>
                <th scope='col' className='fw-normal'>
                  PO#
                </th>
              </tr>
            </thead>
          </table>
  </div>Loading...</div>; // You can display a loading indicator or a message
  }

    return (
      <div>
        <div className='container my-4'>
          <table id='table' className='table table-hover'>
            <thead>
              <tr>
                <th scope='col' className='fw-normal bg-'>
                  ID
                </th>
                <th scope='col' className='fw-normal'>
                  Start Date
                </th>
                <th scope='col' className='fw-normal'>
                  Status
                </th>
                <th scope='col' className='fw-normal'>
                  Setup
                </th>
                <th scope='col' className='fw-normal'>
                  Customer
                </th>
                <th scope='col' className='fw-normal'>
                  Permit/Request#
                </th>
                <th scope='col' className='fw-normal'>
                  Notes
                </th>
                <th scope='col' className='fw-normal'>
                  WO#
                </th>
                <th scope='col' className='fw-normal'>
                  PO#
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>
                    <a href='/'>{item.id}</a>
                  </td>
                  <td>{item.startdate}</td>
                  <td>{item.status}</td>
                  <td>{item.setup}</td>
                  <td>{item.customer}</td>
                  <td>{item.permit}</td>
                  <td>{item.notes}</td>
                  <td>{item.wo}</td>
                  <td>{item.po}</td>
                  <td>
                  <Dropdown>
                    <Dropdown.Toggle variant='white' id="dropdownMenuButton">
                    <i className="bi bi-three-dots-vertical"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={()=>{const params = {status: "New"}; updateJob(item.id, params)}}>New Request</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{const params = {status: "Declined"}; updateJob(item.id, params)}}>Declined</Dropdown.Item>
                      <Dropdown.Item onClick={()=>{const params = {status: "Completed"}; updateJob(item.id, params)}}>Completed</Dropdown.Item>
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