//got too tired but basically need to change this so that on submit we upload the photo file but difficult because that is in a child 
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Components/Firebase';
import { createJob, files } from '../Components/APICalls';
import DateInput from '../Components/DateInput';
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [dates, setDates] = useState([{ startDate: '', startTime: '', endDate: '', endTime: '', NPAT: false, exWeekend: false, twentyFour: false }]);
  const [job, setJob] = useState();
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleDateChange = (index, field, value) => {
    const updatedDates = [...dates];
    updatedDates[index][field] = value;
    setDates(updatedDates);
  };

  const addDate = () => {
    setDates([...dates, { startDate: '', startTime: '', endDate: '', endTime: '', NPAT: false, exWeekend: false, twentyFour: false }]);
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

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const customer = document.getElementById('customerName').value;
    const email = document.getElementById('email').value;
    const poNumber = document.getElementById('poNumber').value;
    const woNumber = document.getElementById('woNumber').value;
    const location = document.getElementById('location').value;

    dates.forEach(async (dateTime) => {  
      
      if(dateTime.twentyFour == true){
        //two jobs, one for putting down and one for picking stuff up
        
      }

      if(dateTime.exWeekend == true){
        //put a job every weekend to remove the sign
        //and a job at the beginning of the week to put in the sign
      }

      if(dateTime.NPAT == true){
        //extra job the day before
      }
      
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
      const createdJob = await createJob(newJob);
      setJob(createdJob);

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
      
      navigate("/jobstable/");
      window.location.reload()

    });

  }
  
  return (
    <div className="container">
      <h1 className="my-4 text-center">Request a job </h1>
      <form onSubmit={handleSubmit}>

      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="mb-3">
          <label htmlFor="customerName">Name</label>
          <input type="text" className="form-control" id="customerName" placeholder="Enter name" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input type="text" className="form-control" id="email" placeholder="Enter email" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="poNumber">PO Number</label>
          <input type="text" className="form-control" id="poNumber" placeholder="Enter PO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label htmlFor="woNumber">WO Number</label>
          <input type="text" className="form-control" id="woNumber" placeholder="Enter WO Number (Optional)" />
        </div>
        <div className="mb-3">
          <label htmlFor="location">Location</label>
          <input type="text" className="form-control" id="location" placeholder="Enter Location" required/>
        </div>
        <div className="mb-3">
          <label htmlFor="fileUpload">Photo</label>
          <input type="file" id="fileUpload" className='form-control' onChange={handleFileChange}/>
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
                deleteDate={deleteDate}
              />
            ))}
          <button type="button" className="btn btn-primary my-2" onClick={addDate}>
            Add Date and Time
          </button>
          </div>
        </div>

      <div className="text-center">
        <button type="submit" className="btn btn-primary">Submit</button>
      </div>
      </form>
    </div>
  );
}

export default FormPage;
