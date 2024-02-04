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
    const createTaskForDate = async (startDate, startTime, endDate, endTime, job, location, taskType = "both") => {
      let startDateTime 
      let endDateTime 
      
      //different pick up and place days
      if(startDate && endDate){
        startDateTime= new Date(startDate + 'T' + startTime);
        endDateTime= new Date(endDate + 'T' + endTime);
      }
      // same day pickup and place
      else if (startDate && endTime){
        startDateTime = new Date(startDate + 'T' + startTime);
        endDateTime = new Date(startDate + 'T' + endTime);
      }
      // just place
      else if (startDate && startTime){
        startDateTime = new Date(startDate + 'T' + startTime);
      }
      //npat 
      else if(startDate){
        startDateTime = startDate
      }
      //just pickup
      else{
        endDateTime = new Date(endDate + 'T' + endTime);
      }
    const newtask = {
      starttime: startDateTime,
      endtime: endDateTime,
      job_id: job.id,
      setup: location,
      completed: false,
      type: taskType
    };
    await createtask(newtask);
  };
  
  const createTasksForExWeekend = async (startDate, startTime, endDate, endTime, job, location) => {
    let currentDate = new Date(startDate);
    //creates first task
    currentDate.setDate(currentDate.getDate() + 1)
    await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);

    while (currentDate <= new Date(endDate)) {
      if (currentDate.getDay() === 5) {
        // Task to pick up the sign on Fridays
        await createTaskForDate(null, null, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location, "pickup");
      }
      else if(currentDate.getDay() != 5 && currentDate.getDay() != 0){
        //Task to keep repeating
        await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
      //creates last task
      await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
  };
  
  const createTasksForRepeat = async (startDate, startTime, endDate, endTime, job, location) => {
    let currentDate = new Date(startDate);
    while (currentDate <= new Date(endDate)) {
      currentDate.setDate(currentDate.getDate() + 1);
      await createTaskForDate(moment(currentDate).format('YYYY-MM-DD'), startTime, moment(currentDate).format('YYYY-MM-DD'), endTime, job, location);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const contact = document.getElementById('contactName').value;
    const email = document.getElementById('email').value;
    const poNumber = document.getElementById('poNumber').value;
    const woNumber = document.getElementById('woNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const requestID = document.getElementById('requestID').value;
    const company = document.getElementById('companyName').value;
    const NPAT = document.getElementById('npat').checked;
    const location = document.getElementById('location').value;

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
          // Two tasks, one for putting down and one for picking stuff up
          await createTaskForDate(dateTime.startDate, dateTime.startTime, null, null, job, 'place');
          await createTaskForDate(null, null, dateTime.endDate, dateTime.endTime, job, location, 'pickup');
      } 
      else if(dateTime.repeat){
          if (dateTime.exWeekend) {          
            // Creating tasks for the inbetween
            await createTasksForExWeekend(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, location);
          } else {
            await createTasksForRepeat(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, location)
          }
      }
      else {
        // Non-twentyFour task
        await createTaskForDate(dateTime.startDate, dateTime.startTime, dateTime.endDate, dateTime.endTime, job, location);
      }
    });
    
    //NPAT task
    if(NPAT){
      let npatStartDate = new Date(earliestStartDate);
      npatStartDate.setDate(npatStartDate.getDate() - 1)
      await createTaskForDate(npatStartDate, null, null, null, job, location, "npat");
    }
    
    updateJob(job.id, 
      {
        contact:contact, 
        status: "New",
        starttime: earliestStartDate,
        endtime: latestEndDate, 
        wo_number: woNumber,
        po_number: poNumber,
        email: email,
        setup: location,
        phone_number: phoneNumber,
        request_id: requestID,
        company: company
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
          <label for="contactName">Company Name</label>
          <input type="text" className="form-control" id="companyName" placeholder="Enter name" required/>
        </div>
        <div className="mb-3">
          <label for="contactName">Contact Name</label>
          <input type="text" className="form-control" id="contactName" placeholder="Enter name" required/>
        </div>
        <div className="mb-3">
          <label for="email">Email address</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email" required/>
        </div>
        <div className="mb-3">
          <label for="phoneNumber">Phone Number</label>
          <input type="text" className="form-control" id="phoneNumber" placeholder="Enter Number" required/>
        </div>
        <div className="mb-3">
          <label for="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" placeholder="Enter WO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label for="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" placeholder="Enter PO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label for="requestID">Request ID</label>
          <input type="text" className="form-control" id="requestID" placeholder="Enter Request ID (Optional)" />
        </div>
        <div className="mb-3">
          <label for="location">Setup</label>
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
