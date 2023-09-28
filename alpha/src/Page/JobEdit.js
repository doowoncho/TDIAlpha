import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getJobById } from "../Components/APICalls";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// Import createJob function if it's defined in '../Components/APICalls'
import { createJob } from '../Components/APICalls';
import DateInput from '../Components/DateInput';

function JobEditPage() {
  const { id } = useParams();
  const [dates, setDates] = useState([{ date: '', startTime: '', endTime: '' }]);
  const [job, setJob] = useState(null);

  const handleDateChange = (index, field, value) => {
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
  };

  const addDate = () => {
    setDates([...dates, { date: '', startTime: '', endTime: '' }]);
  };

  const deleteDate = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const customer = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    const poNumber = document.getElementById('poNumber').value;
    const woNumber = document.getElementById('woNumber').value;
    const location = document.getElementById('location').value;

    console.log(dates)

    dates.forEach((dateTime) => {     
      const startTime = new Date(dateTime.date + 'T' + dateTime.startTime);
      const endTime = new Date(dateTime.date + 'T' + dateTime.endTime);
      const newJob = {
        customer,
        status: 'New',
        email,
        po_number: poNumber,
        wo_number: woNumber,
        setup: location,
        starttime: startTime,
        endtime: endTime
      };
      createJob(newJob);
    });
  }

  useEffect(() => {
    async function fetchJob() {
      try{
        const fetchedJob = await getJobById(id);
        console.log(fetchedJob);
        setJob(fetchedJob);
      } catch (error){
        console.error(error);
      }
    }
    fetchJob();
  }, [id]);

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      <h1 className="my-4 text-center">Edit Job </h1>
      <form onSubmit={handleSubmit}>
        {job.customer ? (
        <div className="mb-3">
          <label htmlFor="customerName">Customer</label>
          <input type="text" className="form-control" id="customer"/>
        </div>
        ) : (
        <div className="mb-3">
          <label htmlFor="customerName">Name</label>
          <input type="text" className="form-control" id="customerName" placeholder={job.customer}/>
        </div>
        )}
        <div className="mb-3">
          <label htmlFor="customerName">Setup</label>
          <input type="text" className="form-control" id="setup" placeholder={job.setup}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input type="text" className="form-control" id="email" placeholder={job.email}/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Permit Number</label>
          <input type="text" className="form-control" id="permit_number" placeholder={job.permit_number == null ? "" : job.permit_number}/>
        </div>
        <div className="mb-3">
          <label htmlFor="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" placeholder={job.po_number} />
        </div>
        <div className="mb-3">
          <label htmlFor="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" placeholder={job.wo_number} />
        </div>
        <div className="mb-3">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" placeholder="Enter Location" />
        </div>
        <p className="text-danger">
          Experimental way to handle multiple dates and times that a client might ask for.
        </p>
            {dates.map((date, index) => (
            <DateInput
              key={index}
              date={date}
              index={index}
              handleDateChange={handleDateChange}
              deleteDate={deleteDate}
            />
          ))}
          <button type="button" className="btn btn-primary my-2" onClick={addDate}>Add Date and Time</button>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default JobEditPage;
