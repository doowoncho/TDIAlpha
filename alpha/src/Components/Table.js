

export default function Table({ data }) {
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }