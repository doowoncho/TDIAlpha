import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Components/Firebase';
import { createJob, createtask, files, getTasksByJobId, updateJob } from '../Components/APICalls';
import DateInput from '../Components/DateInput';
import { useNavigate } from "react-router-dom";
import moment from 'moment';

function FormPage() {
  const [dates, setDates] = useState([{ startDate: '', startTime: '', endDate: '', endTime: '', exWeekend: false, twentyFour: false, repeat: false }]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (index, field, value) => {
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
    console.log(dates)
  };

  const handleCheckboxChanges = (index, field, value) => {
    console.log(index,field,value)
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
  };

  const addDate = () => {
    setDates([...dates, { startDate: '', startTime: '', endDate: '', endTime: '', exWeekend: false, twentyFour: false, repeat: false }]);
  };

  const deleteDate = (index) => {
    const updatedDates = [...dates];
    updatedDates.splice(index, 1);
    setDates(updatedDates);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

   async function fileUploading (createdJob) {
    if(file){
      const fileRef = ref(storage, `${file.name}`);
      let fileBlob;
      const id = createdJob.id;

      await uploadBytes(fileRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
        });
      
      await getDownloadURL(ref(storage, `${file.name}`))
        .then((url) => {
          // `url` is the download URL for 'images/stars.jpg'
          fileBlob = url
        });
        
        let update = {photo_file: fileBlob, photo_name: file.name};   
        await files(id, update);
      }
    }
    
    //DATE LOGIC
    const createTaskForDate = async (startDate, startTime, endDate, endTime, job, customer) => {
      let startDateTime 
      let endDateTime 
      if(startDate && endDate){
        startDateTime= new Date(startDate + 'T' + startTime);
        endDateTime= new Date(endDate + 'T' + endTime);
      }
      else if (startDate && endTime){
        startDateTime = new Date(startDate + 'T' + startTime);
        endDateTime = new Date(startDate + 'T' + endTime);
      }
      else if (startDate && startTime){
        startDateTime = new Date(startDate + 'T' + startTime);
      }
      else{
        endDateTime = new Date(endDate + 'T' + endTime);
      }
    const newtask = {
      customer: customer,
      starttime: startDateTime,
      endtime: endDateTime,
      job_id: job.id,
      completed: false
    };
    await createtask(newtask);
  };
  
  const createTasksForExWeekend = async (startDate, startTime, endDate, endTime, job) => {
    let currentDate = new Date(startDate);

    //creates first task
    currentDate.setDate(currentDate.getDate() + 1)
    await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, null, null, job);

    while (currentDate < new Date(endDate)) {
      if (currentDate.getDay() === 5) {
        // Task to pick up the sign on Fridays
        await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job);
      } else if (currentDate.getDay() === 1) {
        // Task to place the sign on Mondays
        await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, null, null, job);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    //creates last task
    createTaskForDate(null, null, endDate, endTime, job)
  };
  
  const createTasksForRepeat = async (startDate, startTime, endDate, endTime, job) => {
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      currentDate.setDate(currentDate.getDate() + 1);
      await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const customer = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    const poNumber = document.getElementById('poNumber').value;
    const woNumber = document.getElementById('woNumber').value;
    const location = document.getElementById('location').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const requestID = document.getElementById('requestID').value;
    const NPAT = document.getElementById('npat').checked
  

    let job = await createJob()
    let earliestStartDate = null;
    let latestEndDate = null;
    
    dates.forEach(async (dateTime) => {
      if (!earliestStartDate || new Date(dateTime.startDate) < earliestStartDate) {
        earliestStartDate = new Date(dateTime.startDate + 'T' + dateTime.startTime);
      }
      
      if ((!dateTime.endDate && (!latestEndDate || new Date(dateTime.startDate) > latestEndDate)) ||
      (dateTime.endDate && (!latestEndDate || new Date(dateTime.endDate) > latestEndDate))) {
        latestEndDate = dateTime.endDate ? new Date(dateTime.endDate + 'T' + dateTime.endTime) : new Date(dateTime.startDate + 'T' + dateTime.endTime);
      }

      if (dateTime.twentyFour) {
        if (dateTime.exWeekend) {          
          // Creating tasks for the inbetween
          await createTasksForExWeekend(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.startTime, job);

        } else {
          // Two tasks, one for putting down and one for picking stuff up
          await createTaskForDate(dateTime.startDate, dateTime.startTime, null, null, job);
          await createTaskForDate(null, null, dateTime.endDate, dateTime.endTime, job);
        }
      } 
      else if(dateTime.repeat){
          await createTasksForRepeat(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job)
      }
      else {
        // Non-twentyFour task
        await createTaskForDate(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job);
      }
    });
    
    //NPAT task
    if(NPAT){
      await createTaskForDate(null, null, null, null, job);
    }
    
    updateJob(job.id, 
      {
        customer:customer, 
        status: "New",
        starttime: earliestStartDate,
        endtime: latestEndDate, 
        wo_number: woNumber,
        po_number: poNumber,
        email: email,
        location: location,
        phone_number: phoneNumber,
        request_id: requestID,
      }) 
      await fileUploading(job);
      
      // at the end of function set everything in the job
      navigate("/jobstable/");
    }
    
    return (
      <>
      <div className="container">
      <h1 className="my-4 text-center">Request a Job </h1>
      <form onSubmit={handleSubmit}>

      <div className="container" style={{ maxWidth: '800px' }}>

        <div className="mb-3">
          <label for="customerName">Contact Name</label>
          <input type="text" className="form-control" id="customerName" placeholder="Enter name" required/>
        </div>
        <div className="mb-3">
          <label for="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Number" required/>
        </div>
        <div className="mb-3">
          <label for="email">Email address</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email" required/>
        </div>
        <div className="mb-3">
          <label for="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" placeholder="Enter PO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label for="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" placeholder="Enter WO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label for="requestID">Request ID</label>
          <input type="text" className="form-control" id="requestID" placeholder="Enter Request ID (Optional)" />
        </div>
        <div className="mb-3">
          <label for="location">Location</label>
          <input type="text" className="form-control" id="location" placeholder="Enter Location" required/>
        </div>
        <div className="mb-3">
          <label for="fileUpload">Photo</label>
          <input type="file" id="fileUpload" className='form-control' onChange={handleFileChange}/>
        </div>
        <div className="mb-3">
          <input className="form-check-input mx-2" type="checkbox" id="npat"/>
          <label className="form-check-label">NPAT Job</label>
        </div>
      </div>
     

      <div className='container justify-content-center d-flex'>
          <div className="flex-column">
            {dates.map((date, index) => (
              <DateInput
              key={index}
              date={date}
              index={index}
              handleDateChange={handleDateChange}
              handleCheckboxChanges={handleCheckboxChanges}
              deleteDate={deleteDate}
              />
              ))}
          <button type="button" className="btn btn-primary my-2" onClick={addDate}> Add Date and Time </button>
          </div>
        </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      </form>
    </div>
              </>
  );
}

export default FormPage;
